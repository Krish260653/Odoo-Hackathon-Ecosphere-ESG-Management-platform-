-- Migration 004: Seed Data for EcoSphere ESG

-- Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Seed Departments
INSERT INTO public.departments (id, name) VALUES
  ('d0000000-0000-0000-0000-000000000001', 'IT Operations'),
  ('d0000000-0000-0000-0000-000000000002', 'HR & Admin'),
  ('d0000000-0000-0000-0000-000000000003', 'Finance & Legal'),
  ('d0000000-0000-0000-0000-000000000004', 'Sales & Marketing'),
  ('d0000000-0000-0000-0000-000000000005', 'Manufacturing'),
  ('d0000000-0000-0000-0000-000000000006', 'Sustainability Board')
ON CONFLICT (id) DO NOTHING;

-- 2. Seed Auth Users (auth.users)
-- Amit Kumar (employee)
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role, created_at, updated_at)
VALUES (
  'u0000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000000',
  'employee@ecosphere.com',
  crypt('password123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Amit Kumar","role":"employee","department":"IT Operations"}',
  false,
  'authenticated',
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;

-- Neha Sharma (admin)
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role, created_at, updated_at)
VALUES (
  'u0000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000000',
  'admin@ecosphere.com',
  crypt('password123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Neha Sharma","role":"admin","department":"Sustainability Board"}',
  false,
  'authenticated',
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;

-- Force update profile XP for seeding (trigger handles baseline, we override)
UPDATE public.profiles SET xp = 1240 WHERE id = 'u0000000-0000-0000-0000-000000000001';
UPDATE public.profiles SET xp = 450 WHERE id = 'u0000000-0000-0000-0000-000000000002';

-- 3. Seed Emission Factors
INSERT INTO public.emission_factors (id, category, factor_value, unit) VALUES
  ('e0000000-0000-0000-0000-000000000001', 'Electricity', 0.85, 'kWh'),
  ('e0000000-0000-0000-0000-000000000002', 'Natural Gas', 2.1, 'm3'),
  ('e0000000-0000-0000-0000-000000000003', 'Diesel', 2.68, 'liter'),
  ('e0000000-0000-0000-0000-000000000004', 'Flight', 0.25, 'km')
ON CONFLICT (category) DO NOTHING;

-- 4. Seed Carbon Transactions
INSERT INTO public.carbon_transactions (id, department_id, category, value, date, auto_calculated, calculated_emissions) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000005', 'Electricity', 50000, '2026-06-15', true, 42500),
  ('c0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000001', 'Electricity', 20000, '2026-06-20', true, 17000),
  ('c0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000005', 'Natural Gas', 10000, '2026-06-25', true, 21000)
ON CONFLICT (id) DO NOTHING;

-- 5. Seed CSR Activities
INSERT INTO public.csr_activities (id, name, date, department_id, hours) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'E-Waste Recycling Drive', '2026-07-10', 'd0000000-0000-0000-0000-000000000001', 450),
  ('a0000000-0000-0000-0000-000000000002', 'Community School Tutoring', '2026-07-08', 'd0000000-0000-0000-0000-000000000002', 320),
  ('a0000000-0000-0000-0000-000000000003', 'City Canal Cleanup Support', '2026-07-12', 'd0000000-0000-0000-0000-000000000003', 180)
ON CONFLICT (id) DO NOTHING;

-- 6. Seed Challenges
INSERT INTO public.challenges (id, title, description, category, difficulty, deadline, status, xp_reward) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Low-Carbon Commute Challenge', 'Log carpools, public transport, or bicycling to work for 30 consecutive days.', 'Environmental', 'Easy', '18 days left', 'active', 300),
  ('c1000000-0000-0000-0000-000000000002', 'Zero-Waste Office Week', 'Ensure no disposable single-use cups/bottles are logged on office floors.', 'Governance', 'Medium', '5 days left', 'active', 200),
  ('c1000000-0000-0000-0000-000000000003', 'Plastic-Free Cafeteria Pledge', 'Commit to zero single-use plastic consumption at the cafeteria.', 'Environmental', 'Easy', '12 days left', 'active', 150),
  ('c1000000-0000-0000-0000-000000000004', 'Carbon Neutral Supply Chain Vetting', 'Verify and vet Q2 supply chain partners for ISO sustainability certifications.', 'Governance', 'Hard', 'Ended', 'completed', 500)
ON CONFLICT (id) DO NOTHING;

-- 7. Seed Challenge Participation
INSERT INTO public.challenge_participation (id, user_id, challenge_id, progress, proof_submitted, status) VALUES
  ('cp000000-0000-0000-0000-000000000001', 'u0000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 60, false, 'joined'),
  ('cp000000-0000-0000-0000-000000000002', 'u0000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000004', 100, true, 'completed')
ON CONFLICT (id) DO NOTHING;

-- 8. Seed Badges
INSERT INTO public.badges (id, name, category, desc, unlock_rule_type, threshold) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'Carbon Saver', 'Environmental', 'Log 30 days of low-carbon commuting.', 'xp', 300),
  ('b0000000-0000-0000-0000-000000000002', 'CSR Supporter', 'Social', 'Complete 10 hours of volunteer service.', 'challenge_count', 1),
  ('b0000000-0000-0000-0000-000000000003', 'Compliance Champion', 'Governance', 'Achieve 100% training sign-offs.', 'xp', 500),
  ('b0000000-0000-0000-0000-000000000004', 'Green Mentor', 'Environmental', 'Invite 5 colleagues to a sustainability campaign.', 'xp', 1000),
  ('b0000000-0000-0000-0000-000000000005', 'Zero Waste Guru', 'Governance', 'Maintain zero disposable trash logs for a week.', 'challenge_count', 3),
  ('b0000000-0000-0000-0000-000000000006', 'Diversity Advocate', 'Social', 'Contribute to 3 regional D&I workshops.', 'xp', 2000)
ON CONFLICT (name) DO NOTHING;

-- Award starting badges for Amit Kumar
INSERT INTO public.user_badges (user_id, badge_id) VALUES
  ('u0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001'),
  ('u0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000002'),
  ('u0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000003')
ON CONFLICT (user_id, badge_id) DO NOTHING;

-- 9. Seed Rewards
INSERT INTO public.rewards (id, name, xp_cost, stock, desc, category) VALUES
  ('r0000000-0000-0000-0000-000000000001', 'Solar Powered Charger', 800, 5, 'Eco-friendly solar charger for laptop and mobile devices.', 'Tech'),
  ('r0000000-0000-0000-0000-000000000002', 'Reusable Stainless Steel Water Bottle', 300, 12, 'EcoSphere double-walled insulated water flask.', 'Lifestyle'),
  ('r0000000-0000-0000-0000-000000000003', 'Bamboo Cutlery & Straw Set', 150, 25, 'Handcrafted reusable dining set with carrying pouch.', 'Kitchen'),
  ('r0000000-0000-0000-0000-000000000004', 'Tree Planted in Your Name', 400, 50, 'Certificated tree planting in Cauvery Basin restoration project.', 'Conservation'),
  ('r0000000-0000-0000-0000-000000000005', 'Organic Cotton Tote Bag', 200, 18, 'Heavy-duty reusable grocery bag made from organic cotton.', 'Lifestyle'),
  ('r0000000-0000-0000-0000-000000000006', 'Premium Organic Hooded Sweatshirt', 1200, 2, 'Warm corporate brand hoodie made from sustainable organic fabrics.', 'Apparel'),
  ('r0000000-0000-0000-0000-000000000007', 'Electric Bike Rental Voucher (1 Month)', 1500, 3, 'Unlimited e-bike rides in Bangalore city for 30 days.', 'Transport')
ON CONFLICT (name) DO NOTHING;

-- 10. Seed ESG Policies
INSERT INTO public.esg_policies (id, title, content) VALUES
  ('p1000000-0000-0000-0000-000000000001', 'Anti-Bribery and Corruption Policy v3', 'This policy outlines the company\'s absolute prohibition of any form of bribery, kickbacks, or corrupt practices.'),
  ('p1000000-0000-0000-0000-000000000002', 'Data Security & ESG Privacy Protocol', 'Governs the protection and compliance parameters regarding client and employee personal data.'),
  ('p1000000-0000-0000-0000-000000000003', 'Whistleblower Safe Harbor Protection Act', 'Protects employees who report unethical behaviors, financial anomalies, or environmental violations.')
ON CONFLICT (id) DO NOTHING;

-- 11. Seed Policy Acknowledgements
INSERT INTO public.policy_acknowledgements (user_id, policy_id) VALUES
  ('u0000000-0000-0000-0000-000000000001', 'p1000000-0000-0000-0000-000000000001'),
  ('u0000000-0000-0000-0000-000000000001', 'p1000000-0000-0000-0000-000000000002'),
  ('u0000000-0000-0000-0000-000000000002', 'p1000000-0000-0000-0000-000000000003')
ON CONFLICT (user_id, policy_id) DO NOTHING;

-- 12. Seed Audits
INSERT INTO public.audits (id, code, name, department_id, date, auditor, status) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'AUD-998', 'Q2 Internal Energy Audit', 'd0000000-0000-0000-0000-000000000005', '2026-06-18', 'Pooja Singhal', 'Completed'),
  ('a1000000-0000-0000-0000-000000000002', 'AUD-999', 'GDPR Data Alignment Review', 'd0000000-0000-0000-0000-000000000001', '2026-07-25', 'Rajesh Nair', 'Scheduled'),
  ('a1000000-0000-0000-0000-000000000003', 'AUD-1000', 'Supply Chain Sourcing Audit', 'd0000000-0000-0000-0000-000000000003', '2026-07-10', 'Vikram Mehta', 'In Progress')
ON CONFLICT (id) DO NOTHING;

-- 13. Seed Compliance Issues (including overdue items)
-- Issue 1 is overdue (due 2026-06-15, open)
-- Issue 2 is overdue (due 2026-07-01, open)
-- Issue 3 is open (due 2026-07-28, open)
-- Issue 4 is resolved (due 2026-06-10, resolved)
INSERT INTO public.compliance_issues (id, title, department_id, due_date, status, severity, owner_id) VALUES
  ('ci000000-0000-0000-0000-000000000001', 'Waste recycling disposal protocols not adhered to in plant 2B.', 'd0000000-0000-0000-0000-000000000005', '2026-06-15', 'open', 'Critical', 'u0000000-0000-0000-0000-000000000001'),
  ('ci000000-0000-0000-0000-000000000002', 'Server room carbon offset credit registration delayed by 3 weeks.', 'd0000000-0000-0000-0000-000000000001', '2026-07-01', 'open', 'Warning', 'u0000000-0000-0000-0000-000000000001'),
  ('ci000000-0000-0000-0000-000000000003', 'Vendor ISO certification documents missing from central archive.', 'd0000000-0000-0000-0000-000000000003', '2026-07-28', 'open', 'Low', 'u0000000-0000-0000-0000-000000000002'),
  ('ci000000-0000-0000-0000-000000000004', 'Emergency fire exit blocked in building C basement.', 'd0000000-0000-0000-0000-000000000002', '2026-06-10', 'resolved', 'Critical', 'u0000000-0000-0000-0000-000000000002')
ON CONFLICT (id) DO NOTHING;

-- 14. Trigger initial score updates for all departments
SELECT public.calculate_department_score(id) FROM public.departments;

-- Migration 002: Row-Level Security (RLS) Policies

-- 1. Helper function to check if the current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Enable RLS on all tables
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emission_factors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carbon_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.csr_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.csr_activity_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_participation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_participation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esg_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policy_acknowledgements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.department_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 3. Define Table Policies
-- ==========================================

-- DEPARTMENTS Policies
-- Read: Authenticated users
-- Write: Admin only
CREATE POLICY "Allow authenticated read of departments" ON public.departments 
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow admin write of departments" ON public.departments 
    FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- PROFILES Policies
-- Read: Authenticated users (required for leaderboard and logs)
-- Write: User can update their own profile (name, etc.), admin can update all
CREATE POLICY "Allow authenticated read of profiles" ON public.profiles 
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow user to update own profile" ON public.profiles 
    FOR UPDATE TO authenticated USING (auth.uid() = id OR public.is_admin()) WITH CHECK (auth.uid() = id OR public.is_admin());

-- EMISSION FACTORS Policies
-- Read: Authenticated users
-- Write: Admin only
CREATE POLICY "Allow authenticated read of emission factors" ON public.emission_factors 
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow admin write of emission factors" ON public.emission_factors 
    FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- CARBON TRANSACTIONS Policies
-- Read: Authenticated users (for dashboard graphs)
-- Write: Admin only
CREATE POLICY "Allow authenticated read of carbon transactions" ON public.carbon_transactions 
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow admin write of carbon transactions" ON public.carbon_transactions 
    FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- CSR ACTIVITIES Policies
-- Read: Authenticated users
-- Write: Admin only
CREATE POLICY "Allow authenticated read of CSR activities" ON public.csr_activities 
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow admin write of CSR activities" ON public.csr_activities 
    FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- CSR PARTICIPANTS Policies
-- Read: Authenticated users
-- Write: Authenticated users can join/leave themselves
CREATE POLICY "Allow authenticated read of CSR participants" ON public.csr_activity_participants 
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow users to manage their own CSR participation" ON public.csr_activity_participants 
    FOR ALL TO authenticated USING (auth.uid() = user_id OR public.is_admin()) WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- EMPLOYEE PARTICIPATION Logs Policies
-- Read: Authenticated users
-- Write: User can insert own logs, Admin can update/approve all
CREATE POLICY "Allow authenticated read of employee participation logs" ON public.employee_participation 
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow users to log their own participation" ON public.employee_participation 
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow users or admin to manage participation logs" ON public.employee_participation 
    FOR ALL TO authenticated USING (auth.uid() = user_id OR public.is_admin()) WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- CHALLENGES Policies
-- Read: Authenticated users
-- Write: Admin only
CREATE POLICY "Allow authenticated read of challenges" ON public.challenges 
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow admin write of challenges" ON public.challenges 
    FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- CHALLENGE PARTICIPATION Policies
-- Read: Authenticated users
-- Write: Authenticated users can insert/update own progress, Admin can approve
CREATE POLICY "Allow authenticated read of challenge participation" ON public.challenge_participation 
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow users to log/update own challenge participation" ON public.challenge_participation 
    FOR ALL TO authenticated USING (auth.uid() = user_id OR public.is_admin()) WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- ESG POLICIES Policies
-- Read: Authenticated users
-- Write: Admin only
CREATE POLICY "Allow authenticated read of ESG policies" ON public.esg_policies 
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow admin write of ESG policies" ON public.esg_policies 
    FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- POLICY ACKNOWLEDGEMENTS Policies
-- Read: Authenticated users
-- Write: Authenticated users can insert own signature receipt, Admin can delete/manage
CREATE POLICY "Allow authenticated read of acknowledgements" ON public.policy_acknowledgements 
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow users to sign policies" ON public.policy_acknowledgements 
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow admin to manage acknowledgements" ON public.policy_acknowledgements 
    FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- AUDITS Policies
-- Read: Authenticated users
-- Write: Admin only
CREATE POLICY "Allow authenticated read of audits" ON public.audits 
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow admin write of audits" ON public.audits 
    FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- COMPLIANCE ISSUES Policies
-- Read: Authenticated users
-- Write: Admin can manage, users can be assigned owners
CREATE POLICY "Allow authenticated read of compliance issues" ON public.compliance_issues 
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow admin or assigned owner to update issues" ON public.compliance_issues 
    FOR ALL TO authenticated USING (public.is_admin() OR auth.uid() = owner_id) WITH CHECK (public.is_admin() OR auth.uid() = owner_id);

-- BADGES Policies
-- Read: Authenticated users
-- Write: Admin only (system trigger handles user awards)
CREATE POLICY "Allow authenticated read of badges" ON public.badges 
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow admin write of badges" ON public.badges 
    FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- USER BADGES Policies
-- Read: Authenticated users
-- Write: System security triggers only (Admin bypass)
CREATE POLICY "Allow authenticated read of user badges" ON public.user_badges 
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow admin write of user badges" ON public.user_badges 
    FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- REWARDS Policies
-- Read: Authenticated users
-- Write: Admin only (redeem logic handled via postgres function RPC)
CREATE POLICY "Allow authenticated read of rewards" ON public.rewards 
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow admin write of rewards" ON public.rewards 
    FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- DEPARTMENT SCORES Policies
-- Read: Authenticated users
-- Write: Admin only
CREATE POLICY "Allow authenticated read of scores" ON public.department_scores 
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow admin write of scores" ON public.department_scores 
    FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- NOTIFICATIONS Policies
-- Read/Write: Owner can read/update read state, Admin can write/read all
CREATE POLICY "Allow users to read own notifications" ON public.notifications 
    FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Allow users to update own notifications" ON public.notifications 
    FOR UPDATE TO authenticated USING (auth.uid() = user_id OR public.is_admin()) WITH CHECK (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Allow admin to create notifications" ON public.notifications 
    FOR INSERT TO authenticated WITH CHECK (public.is_admin());

-- ==========================================
-- 4. Define Storage Bucket Policies
-- ==========================================

-- Setup Buckets if not exists
INSERT INTO storage.buckets (id, name, public) VALUES ('policy-documents', 'policy-documents', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('audit-reports', 'audit-reports', false) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('challenge-proofs', 'challenge-proofs', true) ON CONFLICT (id) DO NOTHING;

-- Policy documents storage: read anyone, write admin
CREATE POLICY "Policy documents are publicly readable" ON storage.objects
    FOR SELECT USING (bucket_id = 'policy-documents');
CREATE POLICY "Only admins can manage policy documents" ON storage.objects
    FOR ALL TO authenticated USING (bucket_id = 'policy-documents' AND public.is_admin()) WITH CHECK (bucket_id = 'policy-documents' AND public.is_admin());

-- Audit reports storage: read/write admin only
CREATE POLICY "Only admins can read audit reports" ON storage.objects
    FOR SELECT TO authenticated USING (bucket_id = 'audit-reports' AND public.is_admin());
CREATE POLICY "Only admins can manage audit reports" ON storage.objects
    FOR ALL TO authenticated USING (bucket_id = 'audit-reports' AND public.is_admin()) WITH CHECK (bucket_id = 'audit-reports' AND public.is_admin());

-- Challenge proofs storage: upload users (folder matches user uid), read admin/all
CREATE POLICY "Challenge proofs are readable by authenticated users" ON storage.objects
    FOR SELECT TO authenticated USING (bucket_id = 'challenge-proofs');
CREATE POLICY "Users can upload their own challenge proofs" ON storage.objects
    FOR INSERT TO authenticated WITH CHECK (bucket_id = 'challenge-proofs' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Admins or users can delete their own proofs" ON storage.objects
    FOR DELETE TO authenticated USING (bucket_id = 'challenge-proofs' AND ((storage.foldername(name))[1] = auth.uid()::text OR public.is_admin()));

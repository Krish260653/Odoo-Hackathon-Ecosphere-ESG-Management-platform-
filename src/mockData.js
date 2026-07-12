export const initialDepartments = [
  { id: '1', name: 'Engineering', code: 'ENG', head: 'Sophia Vance', parentDept: 'Operations', employeeCount: 42, status: 'Active' },
  { id: '2', name: 'Human Resources', code: 'HR', head: 'Liam Sterling', parentDept: 'Administration', employeeCount: 12, status: 'Active' },
  { id: '3', name: 'Sales & Marketing', code: 'SALES', head: 'Elena Rostova', parentDept: 'Commercial', employeeCount: 28, status: 'Active' },
  { id: '4', name: 'Finance & Compliance', code: 'FIN', head: 'Marcus Vance', parentDept: 'Administration', employeeCount: 15, status: 'Active' },
  { id: '5', name: 'Manufacturing & Ops', code: 'MFG', head: 'Dieter Krause', parentDept: 'Operations', employeeCount: 85, status: 'Active' }
];

export const initialCategories = [
  { id: '1', name: 'Reforestation', type: 'CSR Activity', status: 'Active' },
  { id: '2', name: 'Energy Conservation', type: 'Challenge', status: 'Active' },
  { id: '3', name: 'Diversity Training', type: 'CSR Activity', status: 'Active' },
  { id: '4', name: 'Zero Waste Challenge', type: 'Challenge', status: 'Active' }
];

export const initialEmissionFactors = [
  { id: '1', category: 'Purchase', name: 'Grid Electricity', factor: 0.85, unit: 'kWh' },
  { id: '2', category: 'Manufacturing', name: 'Steel Processing', factor: 1.95, unit: 'kg' },
  { id: '3', category: 'Expenses', name: 'Paper Procurement', factor: 0.50, unit: 'kg' },
  { id: '4', category: 'Fleet', name: 'Diesel Vehicle Fuel', factor: 2.68, unit: 'liters' },
  { id: '5', category: 'Fleet', name: 'Electric Vehicle Charging', factor: 0.21, unit: 'kWh' }
];

export const initialProducts = [
  { id: '1', name: 'EcoSmart Hub', carbonFootprint: '12.5 kg CO2', recyclability: '95%', esgRating: 'A+' },
  { id: '2', name: 'UltraLink Router', carbonFootprint: '24.2 kg CO2', recyclability: '70%', esgRating: 'B' }
];

export const initialEnvironmentalGoals = [
  { id: '1', title: 'Reduce Carbon Footprint by 20%', targetValue: '80,000 kg', currentValue: '92,400 kg', deadline: '2026-12-31', status: 'On Track' },
  { id: '2', title: 'Achieve 100% Renewable Energy', targetValue: '100%', currentValue: '65%', deadline: '2027-06-30', status: 'In Progress' }
];

export const initialPolicies = [
  { id: '1', title: 'Anti-Bribery and Corruption Policy', code: 'GOV-ABC-01', department: 'Finance & Compliance', status: 'Active', updatedDate: '2026-01-15' },
  { id: '2', title: 'Code of Business Conduct', code: 'GOV-CBC-02', department: 'Human Resources', status: 'Active', updatedDate: '2025-09-10' },
  { id: '3', title: 'Environmental Sustainability Policy', code: 'ENV-ESP-03', department: 'Engineering', status: 'Active', updatedDate: '2026-03-22' }
];

export const initialBadges = [
  { id: '1', name: 'Carbon Buster', description: 'Complete 3 energy conservation challenges', unlockRule: '3 Completed Challenges', icon: 'Leaf' },
  { id: '2', name: 'Social Champion', description: 'Accumulate over 1000 CSR activity points', unlockRule: '1000 CSR Points', icon: 'HeartHandshake' },
  { id: '3', name: 'Compliance Star', description: 'Acknowledge all active company governance policies', unlockRule: 'All Policies Signed', icon: 'Scale' },
  { id: '4', name: 'ESG Master', description: 'Earn a total of 2500 combined XP', unlockRule: '2500 Total XP', icon: 'Trophy' }
];

export const initialRewards = [
  { id: '1', name: 'Eco-Friendly Flask', description: 'Sustainable insulated water bottle with bamboo cap.', pointsRequired: 500, stock: 25, status: 'Active' },
  { id: '2', name: 'Plant a Tree', description: 'Sponsor planting a tree in your name with certificate.', pointsRequired: 300, stock: 999, status: 'Active' },
  { id: '3', name: 'Paid Volunteer Day', description: 'Redeem for an extra day off for environmental volunteering.', pointsRequired: 1500, stock: 5, status: 'Active' }
];

export const initialCarbonTransactions = [
  { id: '1', type: 'Purchase', details: 'Office energy consumption Q1', value: 12000, factorId: '1', carbonEmissions: 10200, departmentId: '1', date: '2026-04-10' },
  { id: '2', type: 'Manufacturing', details: 'Steel chassis production run', value: 4500, factorId: '2', carbonEmissions: 8775, departmentId: '5', date: '2026-05-18' },
  { id: '3', type: 'Expenses', details: 'Bulk printing and stationery supplies', value: 250, factorId: '3', carbonEmissions: 125, departmentId: '2', date: '2026-06-02' },
  { id: '4', type: 'Fleet', details: 'Regional sales travel refueling', value: 800, factorId: '4', carbonEmissions: 2144, departmentId: '3', date: '2026-06-15' }
];

export const initialCSRActivities = [
  { id: '1', title: 'Local River Cleanup', description: 'Volunteer drive to clean the local riverbanks.', category: 'Reforestation', points: 150, date: '2026-07-20' },
  { id: '2', title: 'Diversity & Inclusion Seminar', description: 'Interactive workshop on cultural diversity and representation.', category: 'Diversity Training', points: 100, date: '2026-07-28' }
];

export const initialEmployeeParticipation = [
  { id: '1', employee: 'Aarav Mehta', activityId: '1', proof: 'river_cleanup_photo.jpg', approvalStatus: 'Approved', pointsEarned: 150, completionDate: '2026-07-20' },
  { id: '2', employee: 'Zara Khan', activityId: '1', proof: 'cleanup_selfie.png', approvalStatus: 'Pending', pointsEarned: 150, completionDate: '2026-07-21' }
];

export const initialChallenges = [
  { id: '1', title: 'Cycle to Work Week', category: 'Energy Conservation', description: 'Cycle or walk to work instead of driving to lower emissions.', xp: 300, difficulty: 'Medium', evidenceRequired: true, deadline: '2026-08-10', status: 'Active' },
  { id: '2', title: 'No-Plastic July', category: 'Zero Waste Challenge', description: 'Avoid single-use plastics during July.', xp: 500, difficulty: 'Hard', evidenceRequired: true, deadline: '2026-07-31', status: 'Active' }
];

export const initialChallengeParticipation = [
  { id: '1', challengeId: '1', employee: 'Aarav Mehta', progress: 100, proof: 'strava_ride_log.pdf', approvalStatus: 'Approved', xpAwarded: 300 },
  { id: '2', challengeId: '2', employee: 'Zara Khan', progress: 50, proof: 'lunchbox_photo.png', approvalStatus: 'Pending', xpAwarded: 0 }
];

export const initialPolicyAcknowledgements = [
  { id: '1', policyId: '1', employee: 'Aarav Mehta', acknowledged: true, date: '2026-05-10' },
  { id: '2', policyId: '2', employee: 'Zara Khan', acknowledged: true, date: '2026-06-01' },
  { id: '3', policyId: '3', employee: 'Aarav Mehta', acknowledged: false, date: null }
];

export const initialAudits = [
  { id: '1', title: 'Q2 Compliance & Safety Audit', date: '2026-06-10', scope: 'Manufacturing & Administration' },
  { id: '2', title: 'Annual Carbon Accounting Audit', date: '2026-05-04', scope: 'Environmental footprint verification' }
];

export const initialComplianceIssues = [
  { id: '1', auditId: '1', severity: 'High', description: 'Incomplete safety signages in manufacturing floor', owner: 'Dieter Krause', dueDate: '2026-07-10', status: 'Open' },
  { id: '2', auditId: '2', severity: 'Medium', description: 'Vapor venting validation logs missing for March', owner: 'Dieter Krause', dueDate: '2026-07-30', status: 'Open' },
  { id: '3', auditId: '1', severity: 'Low', description: 'Updated waste policy posters not displayed', owner: 'Liam Sterling', dueDate: '2026-08-15', status: 'Resolved' }
];

export const initialEmployees = [
  { name: 'Aarav Mehta', xp: 950, points: 650, departmentId: '1', badges: ['1', '3'] },
  { name: 'Zara Khan', xp: 450, points: 250, departmentId: '3', badges: [] },
  { name: 'Rohan Sharma', xp: 1200, points: 900, departmentId: '5', badges: ['1', '2', '3'] },
  { name: 'Priya Patel', xp: 150, points: 150, departmentId: '2', badges: [] }
];

-- Migration 001: Create Tables Schema for EcoSphere ESG

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Departments Table
CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Profiles Table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'employee')) DEFAULT 'employee',
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    xp INTEGER NOT NULL DEFAULT 0 CHECK (xp >= 0),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Sync auth.users to public.profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
    dept_id UUID;
    dept_name TEXT;
BEGIN
    dept_name := new.raw_user_meta_data->>'department';
    IF dept_name IS NOT NULL THEN
        SELECT id INTO dept_id FROM public.departments WHERE name = dept_name;
    END IF;

    INSERT INTO public.profiles (id, name, role, department_id, xp)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'name', 'New Employee'),
        COALESCE(new.raw_user_meta_data->>'role', 'employee'),
        dept_id,
        0
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to sync new auth signups to profiles
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Emission Factors Table
CREATE TABLE IF NOT EXISTS public.emission_factors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL UNIQUE,
    factor_value NUMERIC NOT NULL CHECK (factor_value >= 0),
    unit TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Carbon Transactions Table
CREATE TABLE IF NOT EXISTS public.carbon_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    value NUMERIC NOT NULL CHECK (value >= 0),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    auto_calculated BOOLEAN NOT NULL DEFAULT true,
    calculated_emissions NUMERIC CHECK (calculated_emissions >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- CSR Activities Table
CREATE TABLE IF NOT EXISTS public.csr_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    hours NUMERIC NOT NULL DEFAULT 0 CHECK (hours >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- CSR Activity Participants (Join Table)
CREATE TABLE IF NOT EXISTS public.csr_activity_participants (
    activity_id UUID REFERENCES public.csr_activities(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    PRIMARY KEY (activity_id, user_id)
);

-- Employee Participation Logs Table
CREATE TABLE IF NOT EXISTS public.employee_participation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    activity_id UUID REFERENCES public.csr_activities(id) ON DELETE CASCADE,
    hours NUMERIC NOT NULL DEFAULT 0 CHECK (hours >= 0),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Challenges Table
CREATE TABLE IF NOT EXISTS public.challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    deadline TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('draft', 'active', 'under_review', 'completed', 'archived')) DEFAULT 'draft',
    xp_reward INTEGER NOT NULL DEFAULT 0 CHECK (xp_reward >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Challenge Participation Table
CREATE TABLE IF NOT EXISTS public.challenge_participation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
    progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    proof_submitted BOOLEAN NOT NULL DEFAULT false,
    proof_url TEXT,
    status TEXT NOT NULL CHECK (status IN ('joined', 'under_review', 'completed')) DEFAULT 'joined',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, challenge_id)
);

-- ESG Policies Table
CREATE TABLE IF NOT EXISTS public.esg_policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT,
    document_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Policy Acknowledgements Table
CREATE TABLE IF NOT EXISTS public.policy_acknowledgements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    policy_id UUID REFERENCES public.esg_policies(id) ON DELETE CASCADE,
    acknowledged_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, policy_id)
);

-- Audits Table
CREATE TABLE IF NOT EXISTS public.audits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    date DATE NOT NULL,
    auditor TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Scheduled', 'In Progress', 'Completed')) DEFAULT 'Scheduled',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Compliance Issues Table (with Overdue generated column)
CREATE TABLE IF NOT EXISTS public.compliance_issues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE,
    due_date DATE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('open', 'resolved')) DEFAULT 'open',
    severity TEXT NOT NULL CHECK (severity IN ('Low', 'Medium', 'Warning', 'Critical')) DEFAULT 'Medium',
    owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    is_overdue BOOLEAN GENERATED ALWAYS AS (due_date < CURRENT_DATE AND status = 'open') STORED,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Badges Table
CREATE TABLE IF NOT EXISTS public.badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    desc TEXT,
    unlock_rule_type TEXT NOT NULL CHECK (unlock_rule_type IN ('xp', 'challenge_count')),
    threshold INTEGER NOT NULL CHECK (threshold >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User Badges (Join Table)
CREATE TABLE IF NOT EXISTS public.user_badges (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE,
    awarded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, badge_id)
);

-- Rewards Table
CREATE TABLE IF NOT EXISTS public.rewards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    xp_cost INTEGER NOT NULL CHECK (xp_cost >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    desc TEXT,
    category TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Department Scores Table
CREATE TABLE IF NOT EXISTS public.department_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE UNIQUE,
    environmental_score NUMERIC NOT NULL DEFAULT 0 CHECK (environmental_score >= 0 AND environmental_score <= 100),
    social_score NUMERIC NOT NULL DEFAULT 0 CHECK (social_score >= 0 AND social_score <= 100),
    governance_score NUMERIC NOT NULL DEFAULT 0 CHECK (governance_score >= 0 AND governance_score <= 100),
    overall_score NUMERIC NOT NULL DEFAULT 0 CHECK (overall_score >= 0 AND overall_score <= 100),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

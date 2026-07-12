-- Migration 003: Postgres Functions, Triggers, and RPC Services

-- ===================================================
-- 1. Automatic Badge Awarding Engine
-- ===================================================

CREATE OR REPLACE FUNCTION public.award_badges_for_user(p_user_id UUID)
RETURNS VOID AS $$
DECLARE
    v_xp INTEGER;
    v_completed_challenges INTEGER;
    badge_rec RECORD;
BEGIN
    -- Get user's current XP
    SELECT xp INTO v_xp FROM public.profiles WHERE id = p_user_id;
    
    -- Get completed challenges count
    SELECT COUNT(*) INTO v_completed_challenges 
    FROM public.challenge_participation 
    WHERE user_id = p_user_id AND status = 'completed';

    -- Loop through badges that the user does not have
    FOR badge_rec IN 
        SELECT b.id, b.name, b.unlock_rule_type, b.threshold
        FROM public.badges b
        WHERE b.id NOT IN (
            SELECT badge_id FROM public.user_badges WHERE user_id = p_user_id
        )
    LOOP
        IF (badge_rec.unlock_rule_type = 'xp' AND v_xp >= badge_rec.threshold) OR
           (badge_rec.unlock_rule_type = 'challenge_count' AND v_completed_challenges >= badge_rec.threshold) THEN
           
            -- Award badge
            INSERT INTO public.user_badges (user_id, badge_id)
            VALUES (p_user_id, badge_rec.id)
            ON CONFLICT DO NOTHING;

            -- Create Notification
            INSERT INTO public.notifications (user_id, type, message)
            VALUES (p_user_id, 'badge', 'Congratulations! You unlocked the "' || badge_rec.name || '" badge and earned recognition.');
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger Function for profile changes
CREATE OR REPLACE FUNCTION public.on_xp_or_challenges_change()
RETURNS TRIGGER AS $$
DECLARE
    v_user_id UUID;
BEGIN
    IF TG_TABLE_NAME = 'profiles' THEN
        v_user_id := new.id;
    ELSIF TG_TABLE_NAME = 'challenge_participation' THEN
        v_user_id := new.user_id;
    END IF;
    
    PERFORM public.award_badges_for_user(v_user_id);
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers for Badges
CREATE OR REPLACE TRIGGER on_profile_xp_update
  AFTER UPDATE OF xp ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.on_xp_or_challenges_change();

CREATE OR REPLACE TRIGGER on_challenge_participation_status_update
  AFTER UPDATE OF status ON public.challenge_participation
  FOR EACH ROW
  WHEN (new.status = 'completed')
  EXECUTE FUNCTION public.on_xp_or_challenges_change();


-- ===================================================
-- 2. Compliance Issue Trigger Notifications
-- ===================================================

CREATE OR REPLACE FUNCTION public.on_compliance_issue_inserted()
RETURNS TRIGGER AS $$
DECLARE
    admin_rec RECORD;
BEGIN
    -- Send notification to all admin profiles
    FOR admin_rec IN SELECT id FROM public.profiles WHERE role = 'admin' LOOP
        INSERT INTO public.notifications (user_id, type, message)
        VALUES (
            admin_rec.id, 
            'compliance', 
            'A new compliance issue has been reported: "' || new.title || '". Action is required by the due date: ' || new.due_date || '.'
        );
    END LOOP;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_compliance_issue_created
  AFTER INSERT ON public.compliance_issues
  FOR EACH ROW EXECUTE FUNCTION public.on_compliance_issue_inserted();


-- ===================================================
-- 3. Participation Decisions Trigger Notifications
-- ===================================================

CREATE OR REPLACE FUNCTION public.on_participation_decision_update()
RETURNS TRIGGER AS $$
BEGIN
    IF old.status = 'pending' AND new.status != 'pending' THEN
        INSERT INTO public.notifications (user_id, type, message)
        VALUES (
            new.user_id, 
            'participation', 
            'Your participation request has been ' || UPPER(new.status) || '.'
        );
    END IF;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_employee_participation_decision
  AFTER UPDATE OF status ON public.employee_participation
  FOR EACH ROW EXECUTE FUNCTION public.on_participation_decision_update();

CREATE OR REPLACE TRIGGER on_challenge_participation_decision
  AFTER UPDATE OF status ON public.challenge_participation
  FOR EACH ROW EXECUTE FUNCTION public.on_participation_decision_update();


-- ===================================================
-- 4. Atomic Rewards Redemption RPC Function
-- ===================================================

CREATE OR REPLACE FUNCTION public.redeem_reward(p_user_id UUID, p_reward_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    v_xp_cost INTEGER;
    v_stock INTEGER;
    v_user_xp INTEGER;
    v_reward_name TEXT;
BEGIN
    -- Lock reward details to prevent race conditions
    SELECT name, xp_cost, stock INTO v_reward_name, v_xp_cost, v_stock
    FROM public.rewards
    WHERE id = p_reward_id
    FOR UPDATE;

    -- Lock profile details
    SELECT xp INTO v_user_xp
    FROM public.profiles
    WHERE id = p_user_id
    FOR UPDATE;

    -- Validate stock and XP balances
    IF v_stock > 0 AND v_user_xp >= v_xp_cost THEN
        -- Deduct XP
        UPDATE public.profiles
        SET xp = xp - v_xp_cost
        WHERE id = p_user_id;

        -- Decrement stock
        UPDATE public.rewards
        SET stock = stock - 1
        WHERE id = p_reward_id;

        -- Send notification
        INSERT INTO public.notifications (user_id, type, message)
        VALUES (
            p_user_id, 
            'reward', 
            'You successfully redeemed "' || v_reward_name || '" for ' || v_xp_cost || ' XP. Your items will be shipped shortly.'
        );

        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ===================================================
-- 5. Automated Weighted Department Score Recomputations
-- ===================================================

CREATE OR REPLACE FUNCTION public.calculate_department_score(p_department_id UUID)
RETURNS VOID AS $$
DECLARE
    v_env_score NUMERIC := 100;
    v_soc_score NUMERIC := 0;
    v_gov_score NUMERIC := 100;
    v_overall_score NUMERIC := 0;

    v_emissions_sum NUMERIC;
    v_volunteering_hours NUMERIC;
    v_total_employees INTEGER;
    v_signed_acknowledgements INTEGER;
    v_total_policies INTEGER;
BEGIN
    -- 1. Environmental Score: Starts at 100, reduced by total carbon emissions / 10
    SELECT COALESCE(SUM(value), 0) INTO v_emissions_sum
    FROM public.carbon_transactions
    WHERE department_id = p_department_id;
    
    v_env_score := GREATEST(0, LEAST(100, 100 - (v_emissions_sum / 10)));

    -- 2. Social Score: Logged volunteering hours * 5
    SELECT COALESCE(SUM(hours), 0) INTO v_volunteering_hours
    FROM public.employee_participation
    WHERE user_id IN (SELECT id FROM public.profiles WHERE department_id = p_department_id)
      AND status = 'approved';
      
    v_soc_score := GREATEST(0, LEAST(100, v_volunteering_hours * 5));

    -- 3. Governance Score: Signature rate of policies
    SELECT COUNT(*) INTO v_total_employees 
    FROM public.profiles 
    WHERE department_id = p_department_id;

    SELECT COUNT(*) INTO v_total_policies 
    FROM public.esg_policies;

    SELECT COUNT(*) INTO v_signed_acknowledgements
    FROM public.policy_acknowledgements
    WHERE user_id IN (SELECT id FROM public.profiles WHERE department_id = p_department_id);

    IF v_total_employees * v_total_policies > 0 THEN
        v_gov_score := LEAST(100, (v_signed_acknowledgements::NUMERIC / (v_total_employees * v_total_policies)) * 100);
    ELSE
        v_gov_score := 100;
    END IF;

    -- 4. Overall Weighted Score (40% Env, 30% Soc, 30% Gov)
    v_overall_score := (v_env_score * 0.40) + (v_soc_score * 0.30) + (v_gov_score * 0.30);

    -- 5. Upsert Score
    INSERT INTO public.department_scores (
        department_id, 
        environmental_score, 
        social_score, 
        governance_score, 
        overall_score, 
        updated_at
    )
    VALUES (
        p_department_id, 
        ROUND(v_env_score, 2), 
        ROUND(v_soc_score, 2), 
        ROUND(v_gov_score, 2), 
        ROUND(v_overall_score, 2), 
        now()
    )
    ON CONFLICT (department_id) DO UPDATE
    SET 
        environmental_score = ROUND(v_env_score, 2),
        social_score = ROUND(v_soc_score, 2),
        governance_score = ROUND(v_gov_score, 2),
        overall_score = ROUND(v_overall_score, 2),
        updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger Function for scores calculation
CREATE OR REPLACE FUNCTION public.trigger_recompute_scores()
RETURNS TRIGGER AS $$
DECLARE
    v_dept_id UUID;
BEGIN
    IF TG_TABLE_NAME = 'carbon_transactions' THEN
        v_dept_id := COALESCE(new.department_id, old.department_id);
    ELSIF TG_TABLE_NAME = 'employee_participation' THEN
        SELECT department_id INTO v_dept_id FROM public.profiles WHERE id = COALESCE(new.user_id, old.user_id);
    ELSIF TG_TABLE_NAME = 'policy_acknowledgements' THEN
        SELECT department_id INTO v_dept_id FROM public.profiles WHERE id = COALESCE(new.user_id, old.user_id);
    END IF;

    IF v_dept_id IS NOT NULL THEN
        PERFORM public.calculate_department_score(v_dept_id);
    END IF;
    
    RETURN COALESCE(new, old);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Score Triggers
CREATE OR REPLACE TRIGGER on_carbon_transaction_change
  AFTER INSERT OR UPDATE OR DELETE ON public.carbon_transactions
  FOR EACH ROW EXECUTE FUNCTION public.trigger_recompute_scores();

CREATE OR REPLACE TRIGGER on_participation_change
  AFTER INSERT OR UPDATE OR DELETE ON public.employee_participation
  FOR EACH ROW EXECUTE FUNCTION public.trigger_recompute_scores();

CREATE OR REPLACE TRIGGER on_acknowledgement_change
  AFTER INSERT OR UPDATE OR DELETE ON public.policy_acknowledgements
  FOR EACH ROW EXECUTE FUNCTION public.trigger_recompute_scores();

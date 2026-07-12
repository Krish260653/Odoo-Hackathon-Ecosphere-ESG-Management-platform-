import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export const useComplianceIssues = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('compliance_issues')
        .select('*, departments(name), profiles(name)')
        .order('due_date', { ascending: true });

      if (error) throw error;

      // Ensure overdue calculation fallback is always reliable
      const processedIssues = (data || []).map(issue => {
        const localOverdueCheck = new Date(issue.due_date) < new Date() && issue.status === 'open';
        return {
          ...issue,
          is_overdue: issue.is_overdue ?? localOverdueCheck,
          dept: issue.departments?.name || 'Manufacturing',
          owner: issue.profiles?.name || 'Neha Sharma'
        };
      });

      setIssues(processedIssues);
    } catch (err) {
      console.error('Error fetching compliance issues:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const reportIssue = async (issue) => {
    try {
      const { data, error } = await supabase
        .from('compliance_issues')
        .insert([{
          ...issue,
          status: 'open'
        }])
        .select();

      if (error) throw error;
      await fetchIssues();
      return data[0];
    } catch (err) {
      console.error('Error reporting compliance issue:', err);
      throw err;
    }
  };

  const resolveIssue = async (issueId) => {
    try {
      const { data, error } = await supabase
        .from('compliance_issues')
        .update({ status: 'resolved' })
        .eq('id', issueId)
        .select();

      if (error) throw error;
      await fetchIssues();
      return data[0];
    } catch (err) {
      console.error('Error resolving compliance issue:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [user]);

  return {
    issues,
    loading,
    error,
    refetch: fetchIssues,
    reportIssue,
    resolveIssue
  };
};

export default useComplianceIssues;

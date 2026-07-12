import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export const useEsgPolicies = () => {
  const { user } = useAuth();
  const [policies, setPolicies] = useState([]);
  const [acknowledgements, setAcknowledgements] = useState([]);
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch Policies
      const { data: polData, error: polError } = await supabase
        .from('esg_policies')
        .select('*');
      if (polError) throw polError;
      setPolicies(polData || []);

      // Fetch User Acknowledgements
      if (user) {
        const { data: ackData, error: ackError } = await supabase
          .from('policy_acknowledgements')
          .select('*')
          .eq('user_id', user.id);
        if (ackError) throw ackError;
        setAcknowledgements(ackData || []);
      }

      // Fetch Audits
      const { data: audData, error: audError } = await supabase
        .from('audits')
        .select('*, departments(name)')
        .order('date', { ascending: false });
      if (audError) throw audError;
      setAudits(audData || []);

    } catch (err) {
      console.error('Error fetching ESG policies data:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const signPolicy = async (policyId) => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('policy_acknowledgements')
        .insert([{
          user_id: user.id,
          policy_id: policyId,
          acknowledged_at: new Date().toISOString()
        }])
        .select();

      if (error) throw error;
      await fetchData();
      return data[0];
    } catch (err) {
      console.error('Error signing policy:', err);
      throw err;
    }
  };

  const addAudit = async (audit) => {
    try {
      const { data, error } = await supabase
        .from('audits')
        .insert([audit])
        .select();

      if (error) throw error;
      await fetchData();
      return data[0];
    } catch (err) {
      console.error('Error adding audit:', err);
      throw err;
    }
  };

  const uploadPolicyDocument = async (file) => {
    if (!file) return;
    try {
      const filePath = `policies/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('policy-documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('policy-documents')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      console.error('Error uploading policy document:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return {
    policies,
    acknowledgements,
    audits,
    loading,
    error,
    refetch: fetchData,
    signPolicy,
    addAudit,
    uploadPolicyDocument
  };
};

export default useEsgPolicies;

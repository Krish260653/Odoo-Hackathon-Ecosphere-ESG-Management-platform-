import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export const useChallenges = () => {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [participations, setParticipations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChallengesData = async () => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      
      // Fetch challenges
      const { data: chalData, error: chalError } = await supabase
        .from('challenges')
        .select('*');
      if (chalError) throw chalError;
      setChallenges(chalData || []);

      // Fetch current user participations
      const { data: partData, error: partError } = await supabase
        .from('challenge_participation')
        .select('*')
        .eq('user_id', user.id);
      if (partError) throw partError;
      setParticipations(partData || []);

    } catch (err) {
      console.error('Error fetching challenges:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const joinChallenge = async (challengeId) => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('challenge_participation')
        .insert([{
          user_id: user.id,
          challenge_id: challengeId,
          progress: 10,
          proof_submitted: false,
          status: 'joined'
        }])
        .select();

      if (error) throw error;
      await fetchChallengesData();
      return data[0];
    } catch (err) {
      console.error('Error joining challenge:', err);
      throw err;
    }
  };

  const leaveChallenge = async (challengeId) => {
    if (!user) return;
    try {
      const { error } = await supabase
        .from('challenge_participation')
        .delete()
        .eq('user_id', user.id)
        .eq('challenge_id', challengeId);

      if (error) throw error;
      await fetchChallengesData();
    } catch (err) {
      console.error('Error leaving challenge:', err);
      throw err;
    }
  };

  const submitProof = async (challengeId, file) => {
    if (!user || !file) return;
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${challengeId}_${Date.now()}.${fileExt}`;

      // 1. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('challenge-proofs')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Fetch Public Url
      const { data: { publicUrl } } = supabase.storage
        .from('challenge-proofs')
        .getPublicUrl(filePath);

      // 3. Update Challenge Participation
      const { data, error } = await supabase
        .from('challenge_participation')
        .update({
          proof_submitted: true,
          proof_url: publicUrl,
          status: 'under_review',
          progress: 95
        })
        .eq('user_id', user.id)
        .eq('challenge_id', challengeId)
        .select();

      if (error) throw error;
      await fetchChallengesData();
      return data[0];
    } catch (err) {
      console.error('Error submitting challenge proof:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchChallengesData();
  }, [user]);

  return {
    challenges,
    participations,
    loading,
    error,
    refetch: fetchChallengesData,
    joinChallenge,
    leaveChallenge,
    submitProof
  };
};

export default useChallenges;

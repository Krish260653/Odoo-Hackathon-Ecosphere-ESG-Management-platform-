import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export const useCsrActivities = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);
  const [participations, setParticipations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch CSR Activities
      const { data: actData, error: actError } = await supabase
        .from('csr_activities')
        .select('*, departments(name)')
        .order('date', { ascending: false });
      if (actError) throw actError;
      setActivities(actData || []);

      // Fetch Employee Participation Logs (join user profile and activity name)
      const { data: partData, error: partError } = await supabase
        .from('employee_participation')
        .select('*, profiles(name, department_id, departments(name)), csr_activities(name)')
        .order('date', { ascending: false });
      if (partError) throw partError;
      
      // Map properties for cleaner usage in component tables
      const mappedParticipations = (partData || []).map(p => ({
        id: p.id,
        name: p.profiles?.name || 'Unknown Employee',
        dept: p.profiles?.departments?.name || 'IT Operations',
        activity: p.csr_activities?.name || 'CSR Volunteering',
        hours: p.hours,
        date: p.date,
        status: p.status,
        user_id: p.user_id
      }));

      setParticipations(mappedParticipations);
    } catch (err) {
      console.error('Error fetching CSR data:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addCsrActivity = async (activity) => {
    try {
      const { data, error } = await supabase
        .from('csr_activities')
        .insert([activity])
        .select();

      if (error) throw error;
      await fetchData();
      return data[0];
    } catch (err) {
      console.error('Error adding CSR activity:', err);
      throw err;
    }
  };

  const updateParticipationStatus = async (id, status) => {
    try {
      const { data, error } = await supabase
        .from('employee_participation')
        .update({ status })
        .eq('id', id)
        .select();

      if (error) throw error;
      await fetchData();
      return data[0];
    } catch (err) {
      console.error('Error updating participation status:', err);
      throw err;
    }
  };

  const logParticipation = async (participation) => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('employee_participation')
        .insert([{
          ...participation,
          user_id: user.id,
          status: 'pending'
        }])
        .select();

      if (error) throw error;
      await fetchData();
      return data[0];
    } catch (err) {
      console.error('Error logging participation:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return {
    activities,
    participations,
    loading,
    error,
    refetch: fetchData,
    addCsrActivity,
    updateParticipationStatus,
    logParticipation
  };
};

export default useCsrActivities;

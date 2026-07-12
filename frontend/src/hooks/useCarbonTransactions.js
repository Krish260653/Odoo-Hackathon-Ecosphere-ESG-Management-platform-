import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useCarbonTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [factors, setFactors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('carbon_transactions')
        .select('*, departments(name)')
        .order('date', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFactors = async () => {
    try {
      const { data, error } = await supabase
        .from('emission_factors')
        .select('*');
      if (error) throw error;
      setFactors(data || []);
    } catch (err) {
      console.error('Error fetching factors:', err);
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const factorObj = factors.find(f => f.category === transaction.category);
      let calculatedEmissions = 0;
      if (factorObj) {
        calculatedEmissions = transaction.value * factorObj.factor_value;
      }
      
      const { data, error } = await supabase
        .from('carbon_transactions')
        .insert([{
          ...transaction,
          calculated_emissions: calculatedEmissions,
          auto_calculated: true
        }])
        .select();

      if (error) throw error;
      await fetchTransactions();
      return data[0];
    } catch (err) {
      console.error('Error adding transaction:', err);
      throw err;
    }
  };

  const addFactor = async (factor) => {
    try {
      const { data, error } = await supabase
        .from('emission_factors')
        .insert([factor])
        .select();
      if (error) throw error;
      await fetchFactors();
      return data[0];
    } catch (err) {
      console.error('Error adding factor:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchFactors();
  }, []);

  return { 
    transactions, 
    factors, 
    loading, 
    error, 
    refetch: fetchTransactions, 
    addTransaction, 
    addFactor 
  };
};

export default useCarbonTransactions;

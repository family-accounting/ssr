import type { SupabaseClient } from "@supabase/supabase-js";

export type Transaction = {
  id?: number;
  wallet_id: string;
  group_id: string;
  user_id: string;
  amount: number;
};
export const useTransactionService = () => {

  const supabase: SupabaseClient = useSupabaseClient();
  const getTransactions = async (walletId?: string, groupId?: string) => {
    let query = supabase.from("TRANSACTION").select("*");
    if (walletId) query = query.eq("wallet_id", walletId);
    if (groupId) query = query.eq("group_id", groupId);
    const x = await query;
    return { data, error };
  };

  const createTransaction = async (transaction: Transaction) => {
    const { data, error } = await supabase
      .from("TRANSACTION")
      .insert([transaction])
      .select();
    return { data, error };
  };

  const updateTransaction = async (id: string, updates: Transaction) => {
    const { data, error } = await supabase
      .from("TRANSACTION")
      .update(updates)
      .eq("id", id)
      .select();
    return { data, error };
  };

  const deleteTransaction = async (id: string) => {
    const { data, error } = await supabase
      .from("TRANSACTION")
      .delete()
      .eq("id", id);
    return { data, error };
  };

  return {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
};

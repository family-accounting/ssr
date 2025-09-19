import type { SupabaseClient } from "@supabase/supabase-js";

export type Wallet = {
  id?: number;
  name: string;
  description: string;
  user_id: string;
};
  
export const useWalletService = () => {
  const supabase: SupabaseClient = useSupabaseClient();
  const getWallets = async (userId: string) => {
    const { data, error } = await supabase
      .from("WALLET")
      .select("*")
      .eq("user_id", userId);
    return { data, error };
  };

  const createWallet = async (wallet: Wallet) => {
    const { data, error } = await supabase
      .from("WALLET")
      .insert([wallet])
      .select();
    return { data, error };
  };

  const updateWallet = async (id: string, updates: Wallet) => {
    const { data, error } = await supabase
      .from("WALLET")
      .update(updates)
      .eq("id", id)
      .select();
    return { data, error };
  };

  const deleteWallet = async (id: string) => {
    const { data, error } = await supabase.from("WALLET").delete().eq("id", id);
    return { data, error };
  };

  return { getWallets, createWallet, updateWallet, deleteWallet };
};

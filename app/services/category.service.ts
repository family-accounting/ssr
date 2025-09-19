import type { SupabaseClient } from "@supabase/supabase-js";

export type Category = {
  id?: number;
  name: string;
};

export const useCategoryService = () => {
  const supabase: SupabaseClient = useSupabaseClient();

  const getCategories = async () => {
    return supabase.from("CATEGORY").select("*");
  };

  const createCategory = async (category: Category) => {
    return supabase.from("CATEGORY").insert([category]).select();
  };

  return { getCategories, createCategory };
};

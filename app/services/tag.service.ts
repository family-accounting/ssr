import type { SupabaseClient } from "@supabase/supabase-js";

export type Tag = {
  id?: number;
  name: string;
  group_id: string;
};

export const useTagService = () => {
  const supabase: SupabaseClient = useSupabaseClient();

  const getTags = async () => supabase.from("TAG").select("*");
  const createTag = async (tag: Tag) =>
    supabase.from("TAG").insert([tag]).select();
  return { getTags, createTag };
};

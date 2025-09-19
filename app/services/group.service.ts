import type { SupabaseClient } from "@supabase/supabase-js";

export type Group = {
  id?: number;
  name: string;
  description: string;
  owner_id: string;
};

export const useGroupService = () => {
  const supabase: SupabaseClient = useSupabaseClient();

  const getGroups = async (userId: string) => {
    const { data, error } = await supabase
      .from("GROUP_USER")
      .select("group_id, GROUP(*)")
      .eq("user_id", userId);
    return { data, error };
  };

  const createGroup = async (group: Group) => {
    const { data, error } = await supabase
      .from("GROUP")
      .insert([group])
      .select();
    return { data, error };
  };

  const addUserToGroup = async (
    groupId: string,
    userId: string,
    roleId: string
  ) => {
    const { data, error } = await supabase
      .from("GROUP_USER")
      .insert([{ group_id: groupId, user_id: userId, role_id: roleId }])
      .select();
    return { data, error };
  };

  return { getGroups, createGroup, addUserToGroup };
};

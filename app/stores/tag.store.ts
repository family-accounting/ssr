import type { ITag } from "~/schemas";
import { defineStore } from "pinia";

export const useTagStore = defineStore('tag', () => {
  const tags = ref<ITag[]>([]);
  const tag = ref<ITag>({} as ITag);
  const supabase = useSupabaseClient();
  const getTags = async () => {
    const { data, error } = await supabase.from("tags").select("*");
    if (error) {
      console.error(error);
    }
    tags.value = data as ITag[];
  };
  const createTag = async (tag: ITag) => {
    const { data, error } = await supabase.from("tags").insert(tag.value);
    if (error) {
      console.error(error);
    }
  };
  return { tags, getTags, tag, createTag };
});

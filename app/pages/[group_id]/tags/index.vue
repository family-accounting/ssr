<script setup lang="ts">
import type { ITag } from "~/schemas";

definePageMeta({
  layout: "group"
});

const supabase = useSupabaseClient();
const route = useRoute();
const groupId = computed(() => route.params.group_id as string);
const tags = ref<ITag[]>([]);
const toast = useToast();
const { data, error } = await supabase
  .from("tags")
  .select("*")
  .eq("group_id", groupId.value);
if (error) {
  // Only show toast on client side to avoid hydration mismatch
  if (process.client) {
    toast.add({
      title: `Error: ${error.code}`,
      description: error.message,
      color: "error",
    });
  }
} else {
  tags.value = data;
}
</script>
<template>
  <section class="py-12">
    <UContainer>
      <h4 class="mb-4">Tags</h4>
      <UButton :to="{ name: 'group_id-tags-create', params: { group_id: groupId } }" variant="solid" color="primary"
        :ui="{ base: 'cursor-pointer' }">Create Tag</UButton>
      <USeparator :ui="{ root: 'my-4' }" />
      <div class="flex flex-wrap gap-4 mt-4">
        <UBadge v-for="tag in tags" :key="tag.id" :label="tag.name" color="warning">
          {{ tag.name }}
        </UBadge>
      </div>
    </UContainer>
  </section>
</template>

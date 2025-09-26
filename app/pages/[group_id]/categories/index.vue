<script setup lang="ts">
import type { ICategory } from "~/schemas";

definePageMeta({
  layout: "group"
});

const supabase = useSupabaseClient();
const route = useRoute();
const groupId = computed(() => route.params.group_id as string);
const categories = ref<ICategory[]>([]);
const toast = useToast();
const { data, error } = await supabase
  .from("categories")
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
  categories.value = data;
}
</script>
<template>
  <section class="py-12">
    <UContainer>
      <h4 class="mb-4">Categories</h4>
      <UButton :to="{
        name: 'group_id-categories-create',
        params: { group_id: groupId },
      }" variant="solid" color="primary" :ui="{ base: 'cursor-pointer' }">Create Category</UButton>
      <USeparator :ui="{ root: 'my-4' }" />
      <div class="flex flex-wrap gap-4 mt-4">
        <UBadge v-for="category in categories" :key="category.id" :label="category.name" color="warning">
          {{ category.name }}
        </UBadge>
      </div>
    </UContainer>
  </section>
</template>

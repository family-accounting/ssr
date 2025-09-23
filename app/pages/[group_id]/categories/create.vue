<script setup lang="ts">
import type { ICreateCategory } from "~/schemas";
import { createCategorySchema } from "~/schemas";
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({
  layout: "group",
  middleware: 'auth'
});

const supabase = useSupabaseClient();
const route = useRoute();
const categoryData = ref<ICreateCategory>({
  group_id: String(route.params.group_id),
} as ICreateCategory);
const toast = useToast();
const loading = ref(false);
const router = useRouter();
const onSubmit = async (event: FormSubmitEvent<ICreateCategory>) => {
  loading.value = true;
  const obj: ICreateCategory = { ...categoryData.value, ...event.data };
  const { error } = await supabase.from("categories").insert(obj);
  if (error) {
    toast.add({
      title: `Error: ${error.code}`,
      description: error.message,
      color: "error",
    });
  } else {
    toast.add({
      title: "Success",
      description: "Category created successfully",
      color: "success",
    });

    router.push({
      name: "group_id-categories",
      params: {
        group_id: route.params.group_id,
      },
    });
  }
  loading.value = false;
};
</script>
<template>
  <section class="py-12">
    <UContainer>
      <UForm
        id="create-category-form"
        :schema="createCategorySchema"
        :state="categoryData"
        class="space-y-4"
        @submit.prevent="onSubmit"
      >
        <UFormField label="Name" name="name">
          <UInput v-model="categoryData.name" :ui="{ root: 'w-full' }" />
        </UFormField>
        <UButton
          type="submit"
          variant="solid"
          color="primary"
          :loading="loading"
          block
          :ui="{ base: 'cursor-pointer' }"
        >
          {{ loading ? "please wait..." : "Create Category" }}
        </UButton>
      </UForm>
    </UContainer>
  </section>
</template>

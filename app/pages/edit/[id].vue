<script setup lang="ts">
import { UpdateGroupSchema, type IUpdateGroup } from "~/schemas";
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({ 
  layout: "default",
});

const supabase = useSupabaseClient();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const loading = ref(false);
const editGroupData = ref<Partial<IUpdateGroup>>({});

const id = route.params.id as string;

// Fetch group data
const { data, error } = await useAsyncData(`group-${id}`, async () => {
  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
});

if (error.value) {
  // Only show toast on client side to avoid hydration mismatch
  if (process.client) {
    toast.add({
      title: `Error: ${error.value.code}`,
      description: error.value.message,
      color: "error",
    });
  }
} else if (data.value) {
  const { created_at, updated_at, owner_id, ...rest } = data.value;
  editGroupData.value = rest;
  console.log("🚀 ~ editGroupData.value:", editGroupData.value);
}

// Handle form submit
const onSubmit = async (event: FormSubmitEvent<IUpdateGroup>) => {
  loading.value = true;
  const { error } = await supabase
    .from("groups")
    .update(event.data)
    .eq("id", id);

  if (error) {
    toast.add({
      title: `Error: ${error.code}`,
      description: error.message,
      color: "error",
    });
  } else {
    toast.add({
      title: "Success",
      description: "Group updated successfully",
      color: "success",
    });
    router.push("/");
  }

  loading.value = false;
};
</script>

<template>
  <section class="py-12">
    <UCard>
      <UForm
        id="update-group-form"
        :schema="UpdateGroupSchema"
        :state="editGroupData"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Name" name="name">
          <UInput v-model="editGroupData.name" :ui="{ root: 'w-full' }" />
        </UFormField>

        <UFormField label="Description" name="description">
          <UInput
            v-model="editGroupData.description"
            :ui="{ root: 'w-full' }"
          />
        </UFormField>

        <UButton
          type="submit"
          variant="solid"
          color="primary"
          :loading="loading"
          block
          :ui="{ base: 'cursor-pointer' }"
        >
          {{ loading ? "Please wait..." : "Update Group" }}
        </UButton>
      </UForm>
    </UCard>
  </section>
</template>

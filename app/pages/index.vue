<script setup lang="ts">
import type { IGroupList, IGroup } from "~/schemas";

const supabase = useSupabaseClient();
const groups = ref<IGroupList>([]);

const fetchGroups = async () => {
  const { data, error }: { data: IGroup[] | null; error: any } = await supabase
    .from("groups")
    .select("*");
  if (error) {
    toast.add({
      title: `Error: ${error.code}`,
      description: error.message,
      color: "error",
    });
  } else {
    groups.value = data || [];
  }
};
await fetchGroups();

const isOpen = ref(false);
const selectedGroup = ref<IGroup>({} as IGroup);
const openDeleteModal = (group: IGroup) => {
  isOpen.value = true;
  selectedGroup.value = group;
};
const toast = useToast();
const deleteGroup = async (id: string) => {
  const { error } = await supabase.from("groups").delete().eq("id", id);
  if (error) {
    toast.add({
      title: `Error: ${error.code}`,
      description: error.message,
      color: "error",
    });
  } else {
    toast.add({
      title: "Success",
      description: "Group deleted successfully",
      color: "success",
    });
    isOpen.value = false;
    await fetchGroups();
  }
};
</script>
<template>
  <div>
    <UButton type="button" variant="link" color="primary" to="/create"
      >Create Group</UButton
    >
    <USeparator :ui="{ root: 'my-4' }" />
    <section class="space-y-4 py-4">
      <UCard
        v-for="group in groups"
        :key="group.id"
        :ui="{ footer: 'flex justify-end gap-x-4' }"
      >
        <h2>{{ group.title }}</h2>
        <p>{{ group.description }}</p>
        <template #footer>
          <UButton
            icon="i-heroicons-eye"
            type="button"
            variant="solid"
            color="primary"
            :to="{ name: 'group_id', params: { group_id: group.id } }"
            >View</UButton
          >
          <UButton
            icon="i-heroicons-pencil"
            type="button"
            variant="solid"
            color="primary"
            :to="{ name: 'edit-id', params: { id: group.id } }"
            >Edit
          </UButton>
          <UButton
            icon="i-heroicons-trash"
            type="button"
            :ui="{ base: 'cursor-pointer' }"
            variant="solid"
            color="error"
            @click="openDeleteModal(group)"
            >Delete
          </UButton>
        </template>
      </UCard>

      <UModal v-model:open="isOpen" :ui="{ body: 'sm:max-w-md p-4' }">
        <template #title>
          <div class="flex items-center gap-x-2 text-red-400">
            <UIcon name="i-heroicons-trash" />
            Delete Group
          </div>
        </template>
        <template #description>
          <p class="text-white py-4">
            Are you sure you want to delete "{{ selectedGroup?.description }}" ?
          </p>
        </template>
        <template #footer>
          <UButton
            variant="solid"
            color="error"
            @click="deleteGroup(selectedGroup?.id)"
          >
            Confirm
          </UButton>
        </template>
      </UModal>
    </section>
  </div>
</template>

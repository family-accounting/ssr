<script setup lang="ts">
import type { IGroup } from '~/types';

const supabase = useSupabaseClient()
const groups = ref<IGroup[]>([])
const fetchGroups = async () => {
    const { data, error }: { data: IGroup[] | null, error: any } = await supabase.from('groups').select('*')
    if (error) {
        toast.add({ title: `Error: ${error.code}`, description: error.message, color: 'error' })
    } else {
        groups.value = data || []
    }
}
await fetchGroups()

const isOpen = ref(false)
const selectedGroup = ref<IGroup>({} as IGroup)
const openDeleteModal = (group: IGroup) => {
    isOpen.value = true
    selectedGroup.value = group
}
const toast = useToast()
const deleteGroup = async (id: string) => {
    const { error } = await supabase.from('groups').delete().eq('id', id)
    if (error) {
        toast.add({ title: `Error: ${error.code}`, description: error.message, color: 'error' })
    } else {
        toast.add({ title: 'Success', description: 'Group deleted successfully', color: 'success' })
        isOpen.value = false
        await fetchGroups()
    }
}
</script>
<template>
    <div>
        <h1>Groups</h1>
        <NuxtLink to="/groups/create">Create Group</NuxtLink>
        <USeparator />
        <section class="space-y-4 py-4">

            <UCard v-for="group in groups" :key="group.id">
                <h2>{{ group.title }} </h2>
                <p>{{ group.description }}</p>
                <UButton type="button" variant="solid" color="primary" :to="`/groups/${group.id}`">View</UButton>
                <UButton type="button" variant="solid" color="primary" :to="`/groups/${group.id}/edit`">Edit</UButton>
                <UButton type="button" variant="solid" color="error" @click="openDeleteModal(group)">Delete</UButton>
            </UCard>

            <UModal v-model:open="isOpen" :ui="{ body: 'sm:max-w-md p-4' }">
                <template #header>
                    <div class="flex items-center space-x-2">
                        <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 text-red-500" />
                        <h3 class="text-lg font-semibold">
                            Delete Group
                        </h3>
                    </div>
                </template>

                <template #content>
                    <div class="space-y-4 p-4">
                        <p class="text-gray-600">
                            Are you sure you want to delete
                            <span class="font-semibold text-red-600">{{ selectedGroup?.title }}</span>?
                        </p>
                        <p class="text-sm text-gray-500">
                            {{ selectedGroup?.description }}
                        </p>
                    </div>
    <div class="flex justify-end space-x-2">
                        <UButton variant="outline" color="neutral" @click="isOpen = false">
                            Cancel
                        </UButton>

                        <UButton variant="solid" color="error" icon="i-heroicons-trash"
                            @click="deleteGroup(selectedGroup?.id)">
                            Delete
                        </UButton>
                    </div>
                </template>

   
            </UModal>

        </section>
    </div>
</template>
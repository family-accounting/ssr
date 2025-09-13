<script setup lang="ts">
import type { IUpdateGroup } from '~/types';
import { updateGroupSchema } from '~/schemas';
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
    layout: 'default'
})
const supabase = useSupabaseClient()
const route = useRoute()
const toast = useToast()
const editGroupData = ref<Partial<IUpdateGroup>>({} as IUpdateGroup)
const id = route.params.id as string
const { data, error } = await supabase.from('groups').select('*').eq('id', id).single()
if (error) {
    toast.add({ title: `Error: ${error.code}`, description: error.message, color: 'error' })
} else {
    editGroupData.value = data
}
const loading = ref(false)
const router = useRouter()
const onSubmit = async (event: FormSubmitEvent<IUpdateGroup>) => {
    loading.value = true
    const { error } = await supabase.from('groups').update(event.data).eq('id', event.data.id)
    if (error) {
        toast.add({ title: `Error: ${error.code}`, description: error.message, color: 'error' })
    } else {
        toast.add({ title: 'Success', description: 'Group created successfully', color: 'success' })
        router.push('/')
    }
}
</script>
<template>
 <section class="py-12">
    <UCard>
        <UForm id="update-group-form" :schema="updateGroupSchema" :state="editGroupData" class="space-y-4" @submit="onSubmit">
            <UFormField label="Title" name="title">
                <UInput v-model="editGroupData.title" :ui="{ root: 'w-full' }" />
            </UFormField>
            <UFormField label="Description" name="description">
                <UInput v-model="editGroupData.description" :ui="{ root: 'w-full' }" />
            </UFormField>
            <UButton type="submit" variant="solid" color="primary" :loading="loading" block>
                {{ loading ? 'please wait...' : 'Update Group' }}
            </UButton>
        </UForm>
    </UCard>
 </section>
</template>
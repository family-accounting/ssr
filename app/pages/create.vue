<script setup lang="ts">
import type { ICreateGroup } from '~/types';
import { createGroupSchema } from '~/schemas';
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
    layout: 'default'
})
const supabase = useSupabaseClient()
const { data: { user } } = await supabase.auth.getUser()
const createGroupData = reactive<Partial<ICreateGroup>>({
    title: '',
    description: '',
    owner_id: user?.id
}) as ICreateGroup
const toast = useToast()
const loading = ref(false)
const router = useRouter()
const onSubmit = async (event: FormSubmitEvent<ICreateGroup>) => {
    loading.value = true
    const { error } = await supabase.from('groups').insert(event.data)
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
        <UForm id="create-group-form" :schema="createGroupSchema" :state="createGroupData" class="space-y-4" @submit="onSubmit">
            <UFormField label="Title" name="title">
                <UInput v-model="createGroupData.title" :ui="{ root: 'w-full' }" />
            </UFormField>
            <UFormField label="Description" name="description">
                <UInput v-model="createGroupData.description" :ui="{ root: 'w-full' }" />
            </UFormField>
            <UButton type="submit" variant="solid" color="primary" :loading="loading" block>
                {{ loading ? 'please wait...' : 'Create Group' }}
            </UButton>
        </UForm>
    </UCard>
 </section>
</template>
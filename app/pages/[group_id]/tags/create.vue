<script setup lang="ts">
import type { ICreateTag } from '~/schemas'
import { createTagSchema } from '~/schemas'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
    layout: 'group'
})

const supabase = useSupabaseClient()
const route = useRoute()
const tagData = ref<ICreateTag>({group_id: String(route.params.group_id)} as ICreateTag)
const toast = useToast()
const loading = ref(false)
const router = useRouter()
const onSubmit = async (event: FormSubmitEvent<ICreateTag>) => {
    loading.value = true
    const obj: ICreateTag = { ...tagData.value, ...event.data }
    console.log("🚀 ~ onSubmit ~ obj:", obj)

    const { error } = await supabase.from('tags').insert(obj)
    if (error) {
        toast.add({ title: `Error: ${error.code}`, description: error.message, color: 'error' })
    } else {
        toast.add({ title: 'Success', description: 'Tag created successfully', color: 'success' })

        router.push(`/${route.params.group_id}/tags`)
    }
    loading.value = false
}
</script>
<template>
    <section class="py-12">
        <UContainer>
            {{ tagData }}
            <UForm id="create-tag-form" :schema="createTagSchema" :state="tagData" class="space-y-4"
                @submit.prevent="onSubmit">
                <UFormField label="Name" name="name">
                    <UInput v-model="tagData.name" :ui="{ root: 'w-full' }" />
                </UFormField>
                <UButton type="submit" variant="solid" color="primary" :loading="loading" block
                    :ui="{ base: 'cursor-pointer' }">
                    {{ loading ? 'please wait...' : 'Create Tag' }}
                </UButton>
            </UForm>
        </UContainer>
    </section>

</template>
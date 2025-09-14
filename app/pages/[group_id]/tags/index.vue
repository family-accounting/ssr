<script setup lang="ts">
import type { ITagList } from '~/schemas'

definePageMeta({
    layout: 'group'
})

const supabase = useSupabaseClient()
const route = useRoute()
const groupId = computed(() => route.params.group_id as string)
const tags = ref<ITagList>([])
const toast = useToast()
const { data, error } = await supabase.from('tags').select('*').eq('group_id', groupId.value)
if (error) {
    toast.add({ title: `Error: ${error.code}`, description: error.message, color: 'error' })
} else {
    tags.value = data
}
</script>
<template>
    <section class="py-12">
        <UContainer>
            <h4>Tags</h4>
            <UButton :to="{name: 'group_id-tags-create', params: {group_id: groupId}}" variant="solid" color="primary">Create Tag</UButton>
            <USeparator />
            <div class="flex flex-wrap gap-4 mt-4">
                <UBadge v-for="tag in tags" :key="tag.id" :label="tag.name" color="warning">
                    {{ tag.name }}
                </UBadge>
            </div>
        </UContainer>
    </section>
</template>
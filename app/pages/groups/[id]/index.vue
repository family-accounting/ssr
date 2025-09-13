<script setup lang="ts">
import type { IGroup } from '~/types';

definePageMeta({
    layout: 'default'
})
const supabase = useSupabaseClient()
const route = useRoute()
const toast = useToast()
const loading = ref(false)

const groupData = ref<Partial<IGroup>>({} as IGroup)
const id = route.params.id as string
const { data, error } = await supabase.from('groups').select('*').eq('id', id).single()
if (error) {
    toast.add({ title: `Error: ${error.code}`, description: error.message, color: 'error' })
} else {
    groupData.value = data
}

</script>
<template>
    <section class="py-12">
     <USkeleton v-if="loading" />
    <UCard v-else>
        <h1>{{ groupData.title }}</h1>
        <p>{{ groupData.description }}</p>
        <p>{{ groupData.owner_id }}</p>

    </UCard>
 </section>
</template>
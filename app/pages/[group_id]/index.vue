<script setup lang="ts">
import { transactionSchema, } from '~/schemas';
import type { IGroup, IUser, ITag, ICategoryList, ITransaction, ITransactionList } from '~/schemas';

definePageMeta({
    layout: 'group'
})
const supabase = useSupabaseClient()
const route = useRoute()
const toast = useToast()
const loading = ref(false)

const groupData = ref<Partial<IGroup>>({} as IGroup)
const groupId = computed(() => route.params.group_id as string)
const { data, error } = await supabase.from('groups').select('*').eq('id', groupId.value).single()
if (error) {
    toast.add({ title: `Error: ${error.code}`, description: error.message, color: 'error' })
} else {
    groupData.value = data
}
const usersData = ref<Partial<IUser>[]>([])
const { data: users, error: usersError } = await supabase.from('group_users').select('*').eq('group_id', groupId.value)
if (usersError) {
    toast.add({ title: `Error: ${usersError.code}`, description: usersError.message, color: 'error' })
} else {
    usersData.value = users
}
const tags = ref<ITag[]>([])
const { data: tagsData, error: tagsError } = await supabase.from('tags').select('*').eq('group_id', groupId.value)
if (tagsError) {
    toast.add({ title: `Error: ${tagsError.code}`, description: tagsError.message, color: 'error' })
} else {
    tags.value = tagsData
}
const categories = ref<ICategoryList>([])
const { data: categoriesData, error: categoriesError } = await supabase.from('categories').select('*').eq('group_id', groupId.value)
if (categoriesError) {
    toast.add({ title: `Error: ${categoriesError.code}`, description: categoriesError.message, color: 'error' })
} else {
    categories.value = categoriesData
}
const transactions = ref<ITransactionList>([])
const { data: transactionsData, error: transactionsError } = await supabase.from('transactions').select('*').eq('group_id', groupId.value)
if (transactionsError) {
    toast.add({ title: `Error: ${transactionsError.code}`, description: transactionsError.message, color: 'error' })
} else {
    transactions.value = transactionsData
}



const transactionData = ref<Partial<ITransaction>>({} as ITransaction)

</script>
<template>
    <section class="py-12">
        <UContainer>
            <USkeleton v-if="loading" />
            <UCard v-else>
                <h1>{{ groupData.title }}</h1>
                <p>{{ groupData.description }}</p>
                <p>{{ groupData.owner_id }}</p>
                <p>{{ groupData }}</p>
            </UCard>
            <USeparator />
            <div class="">
                <h2>Users</h2>
                <p>{{ usersData }}</p>
            </div>
            <USeparator />
            <div class="">
                <h2>Tags</h2>
                <p>{{ tags }}</p>

            </div>
            <USeparator />

            <div class="">
                <h2>Transactions</h2>
                <p>{{ transactions }}</p>
            </div>
            <UForm :state="transactionData" :schema="transactionSchema"></UForm>
            <UFormField label="Amount" name="amount">
                <UInput type="number" v-model="transactionData.amount" :ui="{ root: 'w-full' }" />
            </UFormField>
            <UFormField label="Type" name="type">
                <USelectMenu v-model="transactionData.type" :items="['income', 'expense']" :ui="{ base: 'w-full' }" />
            </UFormField>
            <UFormField label="Description" name="description">
                <UInput v-model="transactionData.description" :ui="{ root: 'w-full' }" />
            </UFormField>
            <UFormField label="Category" name="category_id">
                <USelect v-model="transactionData.category_id" :items="categories" value-key="id"
                    label-key="name" :ui="{ base: 'w-full' }" />
            </UFormField>
            <UFormField label="Tag" name="tag_ids">
                <USelect multiple v-model="transactionData.tag_ids" :items="tags" value-key="id"
                    label-key="name" :ui="{ base: 'w-full' }" />
            </UFormField>
        </UContainer>
    </section>
</template>
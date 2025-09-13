<script setup lang="ts">
import { transactionSchema, userSchema } from '~/schemas';
import type { IGroup, IUser, ITransaction } from '~/types';

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
const usersData = ref<Partial<IUser>[]>([])
const { data: users, error: usersError } = await supabase.from('group_users').select('*').eq('group_id', id)
if (usersError) {
    toast.add({ title: `Error: ${usersError.code}`, description: usersError.message, color: 'error' })
} else {
    usersData.value = users
}

const { data: tags, error: tagsError } = await supabase.from('tags').select('*').eq('group_id', id)
const { data: categories, error: categoriesError } = await supabase.from('categories').select('*').eq('group_id', id)
const { data: transactions, error: transactionsError } = await supabase.from('transactions').select('*').eq('group_id', id)


const transactionData = ref<Partial<ITransaction>>({} as ITransaction)

</script>
<template>
    <section class="py-12">
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
            <USelect v-model="transactionData.category_id" :ui="{ base: 'w-full' }">
                <USelectOption v-for="category in categories" :key="category.id" :value="category.id">
                    {{category.name}}
                </USelectOption>
            </USelect>
        </UFormField>
    </section>
</template>
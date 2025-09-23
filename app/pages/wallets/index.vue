<template>
    <section class="py-12">
        <UContainer>
            <h1 class="mb-4">Wallet</h1>
            <UCard v-for="wallet in wallets" :key="wallet.id">
                <template #header>
                    <h2 class="text-lg font-bold">{{ wallet.name }}</h2>
                </template>
                <template #content>
                    <p>{{ wallet.description }}</p>
                </template>
            </UCard>
            <USeparator />
            {{ wallet }}
            <UForm :state="wallet" :schema="CreateWalletSchema" @submit="createWallet" class="space-y-8">
                <UFormField label="Name" name="name">
                    <UInput v-model="wallet.name" />
                </UFormField>
                <UFormField label="Description" name="description">
                    <UInput v-model="wallet.description" />
                </UFormField>
                <UFormField label="Color" name="color">
                    <UInput v-model="wallet.color" />
                </UFormField>
                <UFormField label="Icon" name="icon">
                    <UInput v-model="wallet.icon" />
                </UFormField>
                <UFormField label="Currency" name="currency">
                    <USelect v-model="wallet.currency" :items="['USD', 'EUR', 'IRR']" />
                </UFormField>
                <UButton variant="solid" color="primary" type="submit">Create
                    Wallet</UButton>
            </UForm>
        </UContainer>
    </section>
</template>
<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { CreateWalletSchema, type IWallet, type ICreateWallet } from '~/schemas';


const supabase = useSupabaseClient();
const toast = useToast();
const { data: userData } = await supabase.auth.getUser();

const wallets = ref<IWallet[]>([]);
const wallet = ref<ICreateWallet>({
    user_id: userData.user?.id as string,
} as ICreateWallet);


// user wallets
const fetchWallets = async () => {
    const { data, error } = await supabase.from('wallets').select('*').eq('user_id', userData.user?.id as string);
    if (error) {
        toast.add({
            title: `Error: ${error.code}`,
            description: error.message,
            color: "error",
        });
    } else {
        wallets.value = data;
    }
}

onMounted(async () => {
    await fetchWallets();
});


const createWallet = async (event: FormSubmitEvent<ICreateWallet>) => {

    const { data, error } = await supabase.from('wallets').insert(wallet.value);

    if (error) {
        toast.add({
            title: `Error: ${error.code}`,
            description: error.message,
            color: "error",
        });
    } else {
        toast.add({
            title: 'Wallet created',
            description: `Wallet ${data[0].name} created successfully`,
            color: "success",
        });

        wallet.value = {
            name: '',
            description: '',
            currency: 'USD',
            user_id: userData.user?.id || '',
            color: '',
            icon: ''
        };

        fetchWallets();
    }
};




</script>
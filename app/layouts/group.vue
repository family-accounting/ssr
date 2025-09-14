<template>
    <nav class="py-4 border-b">
        <div class="container mx-auto">
            <ul class="flex gap-4">
                <ULink to="/">Home</ULink>
                <template v-if="user">
                    <ULink :to="{ name: 'group_id-tags', params: { group_id: groupId } }">Tags</ULink>
                    <!-- <ULink :to="{ name: 'group_id-categories', params: { group_id: groupId } }">Categories</ULink> -->
                    <!-- <ULink :to="{ name: 'group_id-transactions', params: { group_id: groupId } }">Transactions</ULink> -->
                    <!-- <ULink :to="{ name: 'group_id-invitations', params: { group_id: groupId } }">Invitations</ULink> -->

                    <ULink to="/logout" @click="logout">Logout</ULink>
                </template>
                <template v-else>
                    <ULink to="/register">Register</ULink>
                    <ULink to="/login">Login</ULink>
                </template>
            </ul>
        </div>
    </nav>
    <main>
        <slot />
    </main>
</template>
<script setup lang="ts">
const supabase = useSupabaseClient()
const { data: { user } } = await supabase.auth.getUser()
const router = useRouter()
const route = useRoute()
const groupId = computed(() => route.params.group_id)
const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
}
</script>
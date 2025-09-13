<template>
    <nav class="py-4 border-b">
        <div class="container mx-auto">
            <ul class="flex gap-4">
                <ULink to="/">Home</ULink>
                <ULink to="/register" v-if="!user">Register</ULink>
                <ULink to="/login" v-if="!user">Login</ULink>
                <ULink to="/logout" v-if="user" @click="logout">Logout</ULink>
            </ul>
        </div>
    </nav>
    <main class="container mx-auto">
        <slot />
    </main>
</template>
<script setup lang="ts">
const supabase = useSupabaseClient()
const { data: { user } } = await supabase.auth.getUser()
const router = useRouter()
const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
}
</script>
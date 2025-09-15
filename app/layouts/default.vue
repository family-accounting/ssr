<template>
<div class="flex flex-col h-svh">
  <main class="container mx-auto flex-1">
    <slot />
  </main>
  <nav class="py-4 border-t border-t-slate-800">
    <UContainer class="flex justify-between items-center">
      <ul class="flex gap-4">
        <ULink to="/">Groups</ULink>
        <template v-if="user">
          <ULink to="/settings">Settings</ULink>
        </template>
        <template v-else>
          <ULink to="/register">Register</ULink>
          <ULink to="/login">Login</ULink>
        </template>
      </ul>
      <div class="flex items-center gap-x-4">
        <UButton v-if="user" type="button" variant="link" :ui="{ base: 'cursor-pointer' }" @click="logout">Logout
        </UButton>
        <ColorModeButton />
      </div>
    </UContainer>
  </nav>
</div>
</template>
<script setup lang="ts">
const supabase = useSupabaseClient();
const {
  data: { user },
} = await supabase.auth.getUser();
const router = useRouter();
const logout = async () => {
  await supabase.auth.signOut();
  router.push("/login");
};
</script>
<style>

</style>
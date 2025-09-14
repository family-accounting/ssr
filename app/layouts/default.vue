<template>
  <nav class="py-4 border-b">
    <div class="container mx-auto flex justify-between items-center">
      <ul class="flex gap-4">
        <ULink to="/">Home</ULink>
        <template v-if="user">
          <ULink to="/create">Create Group</ULink>
          <UButton type="button" variant="link" :ui="{ base: 'cursor-pointer' }" @click="logout">Logout</UButton>
        </template>
        <template v-else>
          <ULink to="/register">Register</ULink>
          <ULink to="/login">Login</ULink>
        </template>
      </ul>
      <ColorModeButton />
    </div>
  </nav>
  <main class="container mx-auto">
    <slot />
  </main>
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

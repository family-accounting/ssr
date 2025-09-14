<template>
  <nav class="py-4 border-b">
    <div class="container mx-auto">
      <ul class="flex gap-4">
        <ULink to="/">Home</ULink>
        <template v-if="user">
          <ULink to="/create">Create Group</ULink>
          <ULink to="/logout" @click="logout">Logout</ULink>
        </template>
        <template v-else>
          <ULink to="/register">Register</ULink>
          <ULink to="/login">Login</ULink>
        </template>
      </ul>
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

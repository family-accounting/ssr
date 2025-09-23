<template>
  <section class="py-12">
      <UContainer>
          <h1 class="mb-4">Groups</h1>

          {{ groups }}
      </UContainer>
  </section>
</template>
<script setup lang="ts">
import type { IGroup } from '~/schemas';



const supabase = useSupabaseClient();
const toast = useToast();
const groups = ref<IGroup[]>([]);

// user wallets
const { data: userData } = await supabase.auth.getUser();
const { data, error } = await supabase
  .from('groups')
  .select(`
    *,
    user_groups:user_groups(user_id)
  `)
  .eq('user_groups.user_id', userData.user?.id as string);

if (error) {
  toast.add({
      title: `Error: ${error.code}`,
      description: error.message,
      color: "error",
  });
} else {
  groups.value = data;
}

</script>
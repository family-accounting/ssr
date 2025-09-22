<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { RegisterSchema } from "~/schemas";
import type { IRegister } from "~/schemas";
definePageMeta({
  layout: "auth",
});

const registerData = reactive<Partial<IRegister>>({
  email: "maghami.a1987@gmail.com",
  password: "18db@d12",
  confirmPassword: "18db@d12",
  phone: "09123456789",
});
const supabase = useSupabaseClient();
const toast = useToast();
const loading = ref(false);
const router = useRouter();
const onSubmit = async (event: FormSubmitEvent<IRegister>) => {
  loading.value = true;
  const { error } = await supabase.auth.signUp(event.data);
  if (error) {
    toast.add({
      title: `Error: ${error.code}`,
      description: error.message,
      color: "error",
    });
  } else {
    toast.add({
      title: "Success",
      description: "User created successfully",
      color: "success",
    });
    router.push("/login");
  }
  loading.value = false;
};
</script>

<template>
  <UCard :ui="{ root: 'w-96' }">
    <template #header>
      <h1>Register</h1>
    </template>
    <UForm id="register-form" :schema="RegisterSchema" :state="registerData" class="space-y-4"
      @submit.prevent="onSubmit">
      <UFormField label="Phone" name="phone">
        <UInput v-model="registerData.phone" :ui="{ root: 'w-full' }" />
      </UFormField>
      <UFormField label="Email" name="email">
        <UInput v-model="registerData.email" :ui="{ root: 'w-full' }" />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput v-model="registerData.password" type="password" :ui="{ root: 'w-full' }" />
      </UFormField>

      <UFormField label="Confirm Password" name="confirmPassword">
        <UInput v-model="registerData.confirmPassword" type="password" :ui="{ root: 'w-full' }" />
      </UFormField>
    </UForm>

    <template #footer>
      <UButton form="register-form" type="submit" variant="solid" color="primary" :loading="loading" block>
        {{ loading ? "please wait..." : "Register" }}
      </UButton>
      <USeparator orientation="horizontal" type="dashed" />
      <UButton type="button" variant="link" to="/login" color="primary">Login</UButton>
    </template>
  </UCard>
</template>

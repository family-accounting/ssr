<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { LoginSchema } from "~/schemas";
import type { ILogin } from "~/schemas";
definePageMeta({
  layout: "auth",
});

const loginData = reactive<Partial<ILogin>>({
  email: "maghami.a1987@gmail.com",
  password: "18db@d12",
});
const supabase = useSupabaseClient();
const toast = useToast();
const loading = ref(false);
const router = useRouter();
const onSubmit = async (event: FormSubmitEvent<ILogin>) => {
  loading.value = true;
  const { error } = await supabase.auth.signInWithPassword(event.data);
  if (error) {
    toast.add({
      title: `Error: ${error.code}`,
      description: error.message,
      color: "error",
    });
  } else {
    toast.add({
      title: "Success",
      description: "The form has been submitted.",
      color: "success",
    });
    router.push("/");
  }
  loading.value = false;
};
</script>

<template>
  <UCard :ui="{ root: 'w-96', footer: 'space-y-4' }">
    <template #header>
      <h1>Login</h1>
    </template>

    <UForm
      id="login-form"
      :schema="LoginSchema"
      :state="loginData"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormField label="Email" name="email">
        <UInput v-model="loginData.email" :ui="{ root: 'w-full' }" />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput
          v-model="loginData.password"
          type="password"
          :ui="{ root: 'w-full' }"
        />
      </UFormField>
    </UForm>
    <template #footer>
      <UButton
        form="login-form"
        type="submit"
        variant="solid"
        color="primary"
        :loading="loading"
        block
        :ui="{ base: 'cursor-pointer' }"
      >
        {{ loading ? "please wait..." : "Login" }}
      </UButton>
      <USeparator orientation="horizontal" type="dashed" :ui="{ root: '' }" />
      <UButton
        type="button"
        variant="link"
        to="/register"
        color="primary"
        :ui="{}"
        >Register</UButton
      >
    </template>
  </UCard>
</template>

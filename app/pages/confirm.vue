<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
      <div class="max-w-md w-full text-center bg-white p-6 rounded-xl shadow-md">
        <div v-if="loading" class="flex flex-col items-center">
          <svg class="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <p class="text-lg text-gray-700">در حال تایید حساب شما...</p>
        </div>
  
        <div v-if="success" class="text-green-600">
          <h2 class="text-2xl font-semibold mb-2">تبریک!</h2>
          <p>{{ success }}</p>
        </div>
  
        <div v-if="error" class="text-red-500">
          <h2 class="text-2xl font-semibold mb-2">خطا!</h2>
          <p>{{ error }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { createClient } from '@supabase/supabase-js'
  
  const loading = ref(true)
  const success = ref('')
  const error = ref('')
  
  const route = useRoute()
  const router = useRouter()
  
  const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_KEY as string
  )
  
  onMounted(async () => {
    const access_token = route.query.access_token as string
    const refresh_token = route.query.refresh_token as string
  
    if (!access_token || !refresh_token) {
      error.value = 'توکن تایید یافت نشد یا لینک نامعتبر است.'
      loading.value = false
      return
    }
  
    const { error: sessionError } = await supabase.auth.setSession({
      access_token,
      refresh_token
    })
  
    if (sessionError) {
      error.value = sessionError.message
      loading.value = false
      return
    }
  
    success.value = 'حساب شما با موفقیت تایید شد! در حال هدایت به صفحه اصلی...'
    loading.value = false
  
    setTimeout(() => {
      router.push('/')
    }, 2500)
  })
  </script>
  
  <style scoped>
  /* استایل ساده و مدرن */
  body {
    font-family: 'Vazirmatn', sans-serif;
  }
  </style>
  
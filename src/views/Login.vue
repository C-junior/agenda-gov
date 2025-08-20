<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Acesse sua conta
        </h2>
      </div>
      <div class="mt-8 space-y-6">
        <button @click="handleGoogleLogin" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <i class="fab fa-google mr-2"></i>
          Entrar com Google
        </button>
        <div v-if="error" class="text-red-500 text-sm text-center">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { loginWithGoogle } = useAuth()
const error = ref(null)

const handleGoogleLogin = async () => {
  error.value = null
  try {
    await loginWithGoogle()
    router.push('/')
  } catch (e) {
    console.error("Google login error:", e)
    error.value = 'Erro ao fazer login com Google.'
  }
}
</script>

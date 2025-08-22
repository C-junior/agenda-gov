<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-tocantins-blue to-tocantins-yellow py-12 px-4 sm:px-6 lg:px-8">
    <div class="absolute inset-0 bg-black opacity-10"></div>
    <div class="relative max-w-md w-full space-y-8 bg-white rounded-2xl shadow-2xl p-8">
      <div class="text-center">
        <div class="mx-auto flex items-center justify-center">
          <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 border-4 border-tocantins-blue">
            <img src="/brasao_to.png" class="w-16 h-16" alt="Brasão do Tocantins">
          </div>
        </div>
        <h2 class="mt-2 text-3xl font-extrabold text-gray-900">
          Agenda Oficial
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Governador do Estado do Tocantins
        </p>
        <div class="mt-4 border-t border-gray-200 pt-4">
          <h3 class="text-lg font-medium text-gray-900">
            Acesse sua conta
          </h3>
        </div>
      </div>
      
      <div class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <button 
              @click="handleGoogleLogin" 
              class="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-tocantins-blue bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tocantins-blue border-2 border-tocantins-blue transition-all duration-300 hover:shadow-lg"
            >
              <i class="fab fa-google text-lg mr-2"></i>
              <span class="font-semibold">Entrar com Google</span>
            </button>
          </div>
          
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">

            </div>
          </div>
          <img src="/ATI-logo.svg" alt="" class="w-24 mx-auto mb-4">
          
          <!-- <form class="space-y-4" @submit.prevent="handleEmailLogin">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                autocomplete="email" 
                required 
                v-model="email"
                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-tocantins-blue focus:border-tocantins-blue focus:z-10 sm:text-sm"
                placeholder="seu.email@exemplo.com"
              >
            </div>
            
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                autocomplete="current-password" 
                required 
                v-model="password"
                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-tocantins-blue focus:border-tocantins-blue focus:z-10 sm:text-sm"
                placeholder="••••••••"
              >
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input 
                  id="remember-me" 
                  name="remember-me" 
                  type="checkbox" 
                  class="h-4 w-4 text-tocantins-blue focus:ring-tocantins-blue border-gray-300 rounded"
                >
                <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                  Lembrar-me
                </label>
              </div>
              
              <div class="text-sm">
                <a href="#" class="font-medium text-tocantins-blue hover:text-tocantins-yellow">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>
            
            <div>
              <button 
                type="submit" 
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-tocantins-blue hover:bg-tocantins-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tocantins-blue transition-all duration-300 hover:shadow-lg"
              >
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <i class="fas fa-sign-in-alt text-tocantins-yellow"></i>
                </span>
                Entrar
              </button>
            </div>
          </form> -->
        </div>
        
        <div v-if="error" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <i class="fas fa-exclamation-circle text-red-400"></i>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                {{ error }}
              </h3>
            </div>
          </div>
        </div>
        
        <div class="text-center text-sm text-gray-600">
          <p>
            Ao fazer login, você concorda com nossos
            <a href="#" class="font-medium text-tocantins-blue hover:text-tocantins-yellow">
              Termos de Serviço
            </a>
            e
            <a href="#" class="font-medium text-tocantins-blue hover:text-tocantins-yellow">
              Política de Privacidade
            </a>
          </p>
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
const { login, loginWithGoogle } = useAuth()
const email = ref('')
const password = ref('')
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

const handleEmailLogin = async () => {
  error.value = null
  try {
    await login(email.value, password.value)
    router.push('/')
  } catch (e) {
    console.error("Email login error:", e)
    if (e.code === 'auth/user-not-found') {
      error.value = 'Nenhum usuário encontrado com este email.'
    } else if (e.code === 'auth/wrong-password') {
      error.value = 'Senha incorreta.'
    } else {
      error.value = 'Erro ao fazer login. Verifique suas credenciais.'
    }
  }
}
</script>

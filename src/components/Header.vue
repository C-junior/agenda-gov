<template>
  <header class="bg-tocantins-blue shadow-xl/30 pt-10 relative" style="background-image: url('/cerrado-hero.jpg'); background-position: bottom;">
    <div class="absolute inset-0 bg-tocantins-blue opacity-30" style="background: linear-gradient(310deg,rgba(0, 82, 159, 1) 0%, rgba(255, 199, 44, 1) 100%);"></div>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
      <div class="flex items-center w-full md:w-auto justify-between md:justify-start">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
            <img src="/brasao_to.png" class="bg-none" alt="Brasão do Tocantins">
          </div>
          <div class="text-white">
            <h1 class="text-xl sm:text-2xl font-bold text-white">Agenda Oficial</h1>
            <p class="text-sm text-gray-200">Governador do Estado do Tocantins</p>
          </div>
        </div>
        <!-- Mobile buttons for smaller screens when logged in -->
        <div class="md:hidden flex items-center gap-2" v-if="user && isRegister">
          <button 
            @click="$emit('open-modal')" 
            class="bg-tocantins-yellow text-tocantins-blue font-bold p-2 rounded-lg shadow-md hover:bg-tocantins-yellow-dark transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
          >
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
      
      <div class="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
        <button 
          v-if="isRegister"
          @click="$emit('open-modal')" 
          class="hidden md:block bg-tocantins-yellow text-tocantins-blue font-bold py-2 px-4 rounded-lg shadow-md hover:bg-tocantins-yellow-dark transition duration-300 ease-in-out transform hover:scale-105 flex items-center w-full sm:w-auto justify-center"
        >
          <i class="fas fa-plus mr-2"></i>
          <span>Adicionar Evento</span>
        </button>
        <div v-if="user" class="flex items-center gap-2 justify-end w-full md:w-auto">
          <div class="flex items-center gap-2 py-2 ">
            <img 
              v-if="user.photoURL" 
              :src="user.photoURL" 
              :alt="user.displayName || 'Usuário'" 
              class="w-8 h-8 rounded-full object-cover"

            >
            <div class="hidden md:block">
              <span class="text-white">{{ user.email }}</span>
            </div>
          </div>
          <button 
            @click="handleLogout" 
            class="bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'

const { user, isRegister, logout } = useAuth()
const router = useRouter()
const mobileMenuOpen = ref(false)

defineEmits(['open-modal'])

const handleLogout = async () => {
  await logout()
  router.push('/login')
}
</script>

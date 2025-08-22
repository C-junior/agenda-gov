<template>
  <div class="container mx-auto p-4 sm:p-6 lg:p-8">
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Gerenciamento de Usuários</h2>
        <div class="flex space-x-2">
          <router-link 
            to="/"
            class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center"
          >
            <i class="fas fa-arrow-left mr-2"></i>Voltar
          </router-link>
          <button 
            @click="fetchUsers" 
            class="bg-tocantins-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <i class="fas fa-sync-alt mr-2"></i>Atualizar
          </button>
        </div>
      </div>

      <!-- Loading Spinner -->
      <LoadingSpinner v-if="isLoading" />

      <!-- Error Message -->
      <div 
        v-if="error" 
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" 
        role="alert"
      >
        <strong class="font-bold">Ocorreu um erro:</strong>
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <!-- Info Message -->
      <div 
        v-if="infoMessage" 
        class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-lg relative mb-4" 
        role="alert"
      >
        <span class="block sm:inline">{{ infoMessage }}</span>
      </div>

      <!-- Users Table -->
      <div v-if="!isLoading && !error" class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr class="bg-gray-100">
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">Email</th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">Função</th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.uid">
              <td class="py-3 px-4 text-sm text-gray-700">{{ user.email || 'Email não disponível' }}</td>
              <td class="py-3 px-4 text-sm">
                <span 
                  :class="{
                    'bg-blue-100 text-blue-800': user.role === 'register',
                    'bg-gray-100 text-gray-800': user.role === 'viewer'
                  }" 
                  class="px-2 py-1 rounded-full text-xs font-medium"
                >
                  {{ getRoleLabel(user.role) }}
                </span>
              </td>
              <td class="py-3 px-4 text-sm">
                <div class="flex space-x-2">
                  <button 
                    @click="changeUserRole(user, 'register')"
                    :disabled="user.role === 'register'"
                    :class="{
                      'bg-gray-300 cursor-not-allowed': user.role === 'register',
                      'bg-blue-500 hover:bg-blue-700': user.role !== 'register'
                    }"
                    class="text-white px-3 py-1 rounded-md text-xs transition-colors"
                  >
                    Tornar Registrador
                  </button>
                  <button 
                    @click="changeUserRole(user, 'viewer')"
                    :disabled="user.role === 'viewer'"
                    :class="{
                      'bg-gray-300 cursor-not-allowed': user.role === 'viewer',
                      'bg-gray-500 hover:bg-gray-700': user.role !== 'viewer'
                    }"
                    class="text-white px-3 py-1 rounded-md text-xs transition-colors"
                  >
                    Tornar Visualizador
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- No Users Message -->
      <div 
        v-if="!isLoading && users.length === 0 && !error" 
        class="text-center py-10 bg-gray-50 rounded-lg"
      >
        <i class="fas fa-users text-4xl text-gray-400"></i>
        <p class="mt-4 text-lg text-gray-600">Nenhum usuário encontrado.</p>
        <p class="mt-2 text-sm text-gray-500">Tente fazer login com diferentes usuários para que eles sejam registrados.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useUsers } from '../composables/useUsers'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'UserManagement',
  components: {
    LoadingSpinner
  },
  setup() {
    const { users, isLoading, error, fetchUsers, updateUserRole } = useUsers()
    const infoMessage = ref('')
    const router = useRouter()
    
    const getRoleLabel = (role) => {
      switch(role) {
        case 'register': return 'Registrador'
        case 'viewer': return 'Visualizador'
        default: return role
      }
    }

    const changeUserRole = async (user, newRole) => {
      if (confirm(`Tem certeza que deseja alterar o papel do usuário ${user.email || user.uid} para ${getRoleLabel(newRole)}?`)) {
        const result = await updateUserRole(user.uid, newRole)
        if (result.success) {
          // Refresh the list
          fetchUsers()
          infoMessage.value = `Papel do usuário ${user.email || user.uid} atualizado para ${getRoleLabel(newRole)}.`
          setTimeout(() => {
            infoMessage.value = ''
          }, 3000)
        } else {
          alert(result.error)
        }
      }
    }

    onMounted(() => {
      fetchUsers()
    })

    return {
      users,
      isLoading,
      error,
      infoMessage,
      fetchUsers,
      changeUserRole,
      getRoleLabel
    }
  }
}
</script>
<template>
  <header class="bg-tocantins-blue shadow-lg">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <div class="flex items-center">
        <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
          <i class="fas fa-star text-tocantins-yellow text-2xl"></i>
        </div>
        <div>
          <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-white">Agenda Oficial</h1>
          <p class="text-sm sm:text-base text-gray-200">Governador do Estado do Tocantins</p>
        </div>
      </div>
      <button 
        @click="$emit('open-modal')" 
        class="bg-tocantins-yellow text-tocantins-blue font-bold py-2 px-4 rounded-lg shadow-md hover:bg-tocantins-yellow-dark transition duration-300 flex items-center"
      >
        <i class="fas fa-plus mr-2"></i>
        <span class="hidden sm:inline">Adicionar Evento</span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  emits: ['open-modal']
}
</script>
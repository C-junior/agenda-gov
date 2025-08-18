<template>
  <div 
    class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
    @click="$emit('close')"
  >
    <div class="bg-white rounded-lg shadow-2xl w-full max-w-lg" @click.stop>
      <!-- Add/Edit Form -->
      <div v-if="!selectedEvent" class="p-6 sm:p-8">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-gray-800">Adicionar Novo Evento</h3>
          <button @click="$emit('close')" class="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>
        <form @submit.prevent="addEvent">
          <div class="space-y-4">
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700">Título do Evento</label>
              <input 
                type="text" 
                v-model="newEvent.title" 
                id="title" 
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-tocantins-blue focus:border-tocantins-blue" 
                required
              >
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="date" class="block text-sm font-medium text-gray-700">Data</label>
                <input 
                  type="date" 
                  v-model="newEvent.date" 
                  id="date" 
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-tocantins-blue focus:border-tocantins-blue" 
                  required
                >
              </div>
              <div>
                <label for="time" class="block text-sm font-medium text-gray-700">Horário</label>
                <input 
                  type="time" 
                  v-model="newEvent.time" 
                  id="time" 
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-tocantins-blue focus:border-tocantins-blue" 
                  required
                >
              </div>
            </div>
            <div>
              <label for="location" class="block text-sm font-medium text-gray-700">Local</label>
              <input 
                type="text" 
                v-model="newEvent.location" 
                id="location" 
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-tocantins-blue focus:border-tocantins-blue" 
                required
              >
            </div>
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea 
                v-model="newEvent.description" 
                id="description" 
                rows="3" 
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-tocantins-blue focus:border-tocantins-blue"
              ></textarea>
            </div>
          </div>
          <div class="mt-8 flex justify-end space-x-3">
            <button 
              type="button" 
              @click="$emit('close')" 
              class="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              class="bg-tocantins-blue text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-800 transition duration-300"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
      <!-- Event Details View -->
      <div v-else class="p-6 sm:p-8">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-bold text-tocantins-blue">{{ selectedEvent.title }}</h3>
          <button @click="$emit('close')" class="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>
        <div class="space-y-3 text-gray-700">
          <p><i class="fas fa-calendar-alt w-5 text-gray-400 mr-2"></i><strong>Data:</strong> {{ formatDate(selectedEvent.date) }}</p>
          <p><i class="fas fa-clock w-5 text-gray-400 mr-2"></i><strong>Horário:</strong> {{ selectedEvent.time }}</p>
          <p><i class="fas fa-map-marker-alt w-5 text-gray-400 mr-2"></i><strong>Local:</strong> {{ selectedEvent.location }}</p>
          <div v-if="selectedEvent.description">
            <p class="font-bold mt-4 mb-1">Descrição:</p>
            <p class="text-sm bg-gray-50 p-3 rounded-md">{{ selectedEvent.description }}</p>
          </div>
        </div>
        <div class="mt-8 flex justify-end">
          <button 
            type="button" 
            @click="$emit('close')" 
            class="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventModal',
  props: {
    selectedEvent: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'add-event'],
  data() {
    return {
      newEvent: { 
        title: '', 
        date: '', 
        time: '', 
        location: '', 
        description: '' 
      }
    }
  },
  methods: {
    addEvent() {
      if (!this.newEvent.title || !this.newEvent.date || !this.newEvent.time || !this.newEvent.location) return
      this.$emit('add-event', this.newEvent)
    },
    formatDate(dateString) {
      const date = new Date(dateString + 'T00:00:00')
      return date.toLocaleDateString('pt-BR')
    }
  }
}
</script>
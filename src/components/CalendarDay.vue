<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <!-- Day Navigation -->
    <div class="flex items-center justify-between mb-4 bg-white p-3 rounded-lg shadow">
      <button 
        @click="changeDay(-1)" 
        class="p-2 rounded-full hover:bg-gray-200 transition-colors"
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      <h3 class="text-xl font-semibold text-tocantins-blue">
        {{ currentDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}
      </h3>
      <button 
        @click="changeDay(1)" 
        class="p-2 rounded-full hover:bg-gray-200 transition-colors"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    
    <!-- Events List -->
    <div class="p-4">
      <div v-if="dayEvents.length === 0" class="text-center py-10">
        <i class="fas fa-calendar-times text-4xl text-gray-400"></i>
        <p class="mt-4 text-lg text-gray-600">Nenhum evento agendado para este dia.</p>
      </div>
      
      <div v-else class="space-y-3">
        <div 
          v-for="event in dayEvents" 
          :key="event.id" 
          @click="$emit('open-event', event)"
          class="bg-blue-100 p-4 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors duration-200"
        >
          <p class="font-bold text-lg text-gray-800">{{ event.title }}</p>
          <p class="text-sm text-gray-600 mt-1">
            <i class="fas fa-clock mr-2"></i>
            {{ event.time }} - {{ event.location }}
          </p>
          <p v-if="event.description" class="text-sm text-gray-700 mt-2">{{ event.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarDay',
  props: {
    currentDate: {
      type: Date,
      required: true
    },
    events: {
      type: Array,
      required: true
    }
  },
  emits: ['open-event', 'change-day'],
  computed: {
    dayEvents() {
      return this.events.filter(event => this.isSameDay(new Date(event.date + 'T00:00:00'), this.currentDate))
    }
  },
  methods: {
    isSameDay(date1, date2) {
      return date1.getFullYear() === date2.getFullYear() &&
             date1.getMonth() === date2.getMonth() &&
             date1.getDate() === date2.getDate()
    },
    changeDay(direction) {
      this.$emit('change-day', direction)
    }
  }
}
</script>
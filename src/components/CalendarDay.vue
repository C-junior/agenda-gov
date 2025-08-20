<template>
  <div class="space-y-4">
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
    <div 
      v-if="dayEvents.length === 0" 
      class="text-center py-10 bg-white rounded-lg shadow-md"
    >
      <i class="fas fa-calendar-times text-4xl text-gray-400"></i>
      <p class="mt-4 text-lg text-gray-600">Nenhum evento agendado para este dia.</p>
    </div>
    
    <div 
      v-for="event in sortedDayEvents" 
      :key="event.id" 
      @click="$emit('open-event', event)"
      class="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer"
    >
      <div class="flex">
        <div class="w-24 text-white flex flex-col items-center justify-center p-4 text-center" style="background: linear-gradient(310deg,rgba(0, 82, 159, 1) 0%, rgba(255, 199, 44, 1) 100%);">
          <span class="text-4xl font-bold">{{ getDay(event.date) }}</span>
          <span class="text-sm uppercase">{{ getMonthShort(event.date) }}</span>
          <span class="text-xs">{{ getYear(event.date) }}</span>
        </div>
        <div class="p-4 sm:p-6 flex-grow">
          <div class="flex justify-between items-start">
            <h3 class="text-xl font-bold text-gray-900 mb-1">{{ event.title }}</h3>
            <span class="bg-blue-100 text-tocantins-blue text-xs font-semibold px-2.5 py-0.5 rounded-full">{{ event.time }}</span>
          </div>
          <div class="divider_event items-start"></div>
          <p class="text-gray-600 flex items-center mb-3">
            <i class="fas fa-map-marker-alt mr-2 text-gray-400"></i>{{ event.location }}
          </p>
          <p class="text-gray-700 text-sm">{{ event.description }}</p>
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
    },
    sortedDayEvents() {
      return [...this.dayEvents].sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`))
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
    },
    getDay(dateString) {
      return new Date(dateString + 'T00:00:00').getDate()
    },
    getMonthShort(dateString) {
      return new Date(dateString + 'T00:00:00').toLocaleString('pt-BR', { month: 'short' }).replace('.', '')
    },
    getYear(dateString) {
      return new Date(dateString + 'T00:00:00').getFullYear()
    }
  }
}
</script>

<style scoped>
.divider_event {
  width: 80px;
  height: 2px;
  background: linear-gradient(310deg,rgba(0, 82, 159, 1) 0%, rgba(255, 199, 44, 1) 100%);
  position: relative ;
  left: 0 ;
  margin: 6px;
}
</style>
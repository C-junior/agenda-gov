<template>
  <div class="space-y-4">
    <div 
      v-for="event in sortedEvents" 
      :key="event.id" 
      class="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
    >
      <div class="flex">
        <div class="w-24 bg-linear-to-r from-bg-tocantins-yellow to-bg-tocantins-blue text-white flex flex-col items-center justify-center p-4 text-center">
          <span class="text-4xl font-bold">{{ getDay(event.date) }}</span>
          <span class="text-sm uppercase">{{ getMonthShort(event.date) }}</span>
          <span class="text-xs">{{ getYear(event.date) }}</span>
        </div>
        <div class="p-4 sm:p-6 flex-grow">
          <div class="flex justify-between items-start">
            <h3 class="text-xl font-bold text-gray-900 mb-1">{{ event.title }}</h3>
            <span class="bg-blue-100 text-tocantins-blue text-xs font-semibold px-2.5 py-0.5 rounded-full">{{ event.time }}</span>
          </div>
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
  name: 'EventList',
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedEvents() {
      return [...this.events].sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`))
    }
  },
  methods: {
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
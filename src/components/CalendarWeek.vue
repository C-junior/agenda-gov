<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <div class="grid grid-cols-7">
      <div 
        v-for="day in weekDaysData" 
        :key="day.date.toISOString()" 
        class="border-r p-2"
      >
        <div class="text-center mb-2">
          <p class="text-sm text-gray-500">{{ day.dayName }}</p>
          <p 
            class="text-2xl font-bold" 
            :class="{'text-tocantins-blue': day.isToday}"
          >
            {{ day.date.getDate() }}
          </p>
        </div>
        <div class="space-y-2">
          <div 
            v-for="event in day.events" 
            :key="event.id" 
            @click="$emit('open-event', event)"
            class="bg-blue-100 p-2 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors duration-200"
          >
            <p class="font-bold text-sm text-gray-800">{{ event.title }}</p>
            <p class="text-xs text-gray-600">{{ event.time }} - {{ event.location }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarWeek',
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
  emits: ['open-event'],
  computed: {
    weekDaysData() {
      const startOfWeek = this.getStartOfWeek(this.currentDate)
      const weekData = []
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek)
        date.setDate(date.getDate() + i)
        weekData.push({
          date: date,
          dayName: date.toLocaleString('pt-BR', { weekday: 'short' }),
          isToday: this.isSameDay(date, new Date()),
          events: this.getEventsForDay(date)
        })
      }
      return weekData
    }
  },
  methods: {
    getStartOfWeek(date) {
      const dt = new Date(date)
      const day = dt.getDay()
      const diff = dt.getDate() - day + (day === 0 ? -6 : 0) // Adjust to start on Sunday
      return new Date(dt.setDate(diff))
    },
    getEventsForDay(date) {
      return this.events.filter(event => this.isSameDay(new Date(event.date + 'T00:00:00'), date))
    },
    isSameDay(date1, date2) {
      return date1.getFullYear() === date2.getFullYear() &&
             date1.getMonth() === date2.getMonth() &&
             date1.getDate() === date2.getDate()
    }
  }
}
</script>
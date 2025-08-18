<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <div class="grid grid-cols-7 text-center font-bold text-gray-600 border-b">
      <div v-for="day in weekDays" :key="day" class="py-3">{{ day }}</div>
    </div>
    <div class="grid grid-cols-7">
      <div 
        v-for="day in calendarDays" 
        :key="day.date.toISOString()" 
        class="calendar-day p-2" 
        :class="{'bg-gray-50 text-gray-400': !day.isCurrentMonth, 'font-bold': day.isToday}"
      >
        <span 
          :class="{'calendar-today': day.isToday}"
        >
          {{ day.date.getDate() }}
        </span>
        <div class="mt-1">
          <div 
            v-for="event in day.events" 
            :key="event.id" 
            @click="$emit('open-event', event)"
            class="calendar-event"
          >
            {{ event.time }} - {{ event.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarMonth',
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
  data() {
    return {
      weekDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    }
  },
  computed: {
    calendarDays() {
      const year = this.currentDate.getFullYear()
      const month = this.currentDate.getMonth()
      const firstDayOfMonth = new Date(year, month, 1)
      const lastDayOfMonth = new Date(year, month + 1, 0)
      const startDate = new Date(firstDayOfMonth)
      startDate.setDate(startDate.getDate() - startDate.getDay()) // Start from Sunday
      const days = []
      for (let i = 0; i < 42; i++) {
        const date = new Date(startDate)
        date.setDate(date.getDate() + i)
        days.push({
          date: date,
          isCurrentMonth: date.getMonth() === month,
          isToday: this.isSameDay(date, new Date()),
          events: this.getEventsForDay(date)
        })
      }
      return days
    }
  },
  methods: {
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
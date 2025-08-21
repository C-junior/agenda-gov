<template>
  <div class="space-y-4">
    <div 
      v-for="event in sortedEvents" 
      :key="event.id" 
      @click="$emit('open-event', event)"
      class="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer"
    >
      <div class="flex">
        <div class="w-24 text-white flex flex-col items-center justify-center p-4 text-center " style="background: linear-gradient(310deg,rgba(0, 82, 159, 1) 0%, rgba(255, 199, 44, 1) 100%);">
          <span class="text-4xl font-bold">{{ getDay(event.date) }}</span>
          <span class="text-sm uppercase">{{ getMonthShort(event.date) }}</span>
          <span class="text-xs">{{ getYear(event.date) }}</span>
        </div>
        <div class="p-4 sm:p-6 flex-1">
          <div class="flex justify-between items-start">
            <h3 class="text-xl font-bold text-gray-900 mb-1">{{ event.title }}</h3>
            <span class="bg-blue-100 text-tocantins-blue text-xs font-semibold px-2.5 py-0.5 rounded-full">{{ event.time }}</span>
          </div>
          <div class="divider_event items-start">
              
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
  emits: ['open-event'],
  computed: {
    sortedEvents() {
      // Filter out events before today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const futureEvents = this.events.filter(event => {
        const eventDate = new Date(event.date + 'T00:00:00');
        return eventDate >= today;
      });
      
      // Sort remaining events by date and time
      return [...futureEvents].sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
      });
    }
  },
  methods: {
    getDay(dateString) {
      return new Date(dateString + 'T00:00:00').getDate();
    },
    getMonthShort(dateString) {
      return new Date(dateString + 'T00:00:00').toLocaleString('pt-BR', { month: 'short' }).replace('.', '');
    },
    getYear(dateString) {
      return new Date(dateString + 'T00:00:00').getFullYear();
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
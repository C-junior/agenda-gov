<template>
  <div id="app" class="flex flex-col min-h-screen">
    <AppHeader @open-modal="toggleModal" />
    
    <main class="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
      <!-- View Toggler -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Compromissos</h2>
        <div class="flex space-x-1 bg-blue-100 p-1 rounded-lg">
          <button 
            @click="view = 'list'" 
            :class="{'bg-tocantins-blue text-white': view === 'list', 'text-gray-600': view !== 'list'}" 
            class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
          >
            Lista
          </button>
          <button 
            @click="view = 'day'" 
            :class="{'bg-tocantins-blue text-white': view === 'day', 'text-gray-600': view !== 'day'}" 
            class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
          >
            Dia
          </button>
          <!-- <button 
            @click="view = 'month'" 
            :class="{'bg-tocantins-blue text-white': view === 'month', 'text-gray-600': view !== 'month'}" 
            class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
          >
            Mês
          </button> -->
        </div>
      </div>

      <!-- Loading Spinner -->
      <LoadingSpinner v-if="isLoading" />

      <!-- Error Message -->
      <div 
        v-if="error" 
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" 
        role="alert"
      >
        <strong class="font-bold">Ocorreu um erro:</strong>
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <!-- No Events Message -->
      <div 
        v-if="!isLoading && events.length === 0 && !error" 
        class="text-center py-10 bg-white rounded-lg shadow-md"
      >
        <i class="fas fa-calendar-times text-4xl text-gray-400"></i>
        <p class="mt-4 text-lg text-gray-600">Nenhum evento agendado no momento.</p>
      </div>

      <!-- LIST VIEW -->
      <EventList 
        v-if="!isLoading && view === 'list' && events.length > 0" 
        :events="events" 
        @open-event="openEventModal"
      />

      <!-- DAY VIEW -->
      <CalendarDay 
        v-if="!isLoading && view === 'day' && !error"
        :current-date="currentDate" 
        :events="events"
        @open-event="openEventModal"
        @change-day="changeDay"
      />

      <!-- MONTH VIEW -->
      <div v-if="!isLoading && view === 'month' && !error">
        <!-- Calendar Header -->
        <div class="flex items-center justify-between mb-4 bg-white p-3 rounded-lg shadow">
          <button 
            @click="changePeriod(-1)" 
            class="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <h3 class="text-xl font-semibold text-tocantins-blue">{{ currentPeriodLabel }}</h3>
          <button 
            @click="changePeriod(1)" 
            class="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>

        <CalendarMonth 
          :current-date="currentDate" 
          :events="events"
          @open-event="openEventModal"
        />
      </div>
    </main>

    <AppFooter />

    <!-- Modal -->
    <EventModal 
      v-if="showModal" 
      :selected-event="selectedEvent"
      @close="toggleModal"
      @add-event="handleAddEvent"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useEvents } from './composables/useEvents'
import AppHeader from './components/Header.vue'
import AppFooter from './components/Footer.vue'
import EventList from './components/EventList.vue'
import CalendarMonth from './components/CalendarMonth.vue'
import CalendarDay from './components/CalendarDay.vue'
import EventModal from './components/EventModal.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    EventList,
    CalendarMonth,
    CalendarDay,
    EventModal,
    LoadingSpinner
  },
  setup() {
    const { events, isLoading, error, addEvent, fetchEvents } = useEvents()
    
    const view = ref('list') // 'list', 'day', 'month'
    const currentDate = ref(new Date())
    const showModal = ref(false)
    const selectedEvent = ref(null)
    
    const currentPeriodLabel = computed(() => {
      if (view.value === 'month') {
        return currentDate.value.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })
      }
      return ''
    })
    
    const toggleModal = () => {
      showModal.value = !showModal.value
      if (!showModal.value) {
        selectedEvent.value = null
      }
    }
    
    const openEventModal = (event) => {
      selectedEvent.value = event
      showModal.value = true
    }
    
    const handleAddEvent = async (event) => {
      const result = await addEvent(event)
      if (result.success) {
        toggleModal()
      } else {
        alert(result.error)
      }
    }
    
    const changePeriod = (direction) => {
      const newDate = new Date(currentDate.value)
      if (view.value === 'month') {
        newDate.setMonth(newDate.getMonth() + direction)
      }
      currentDate.value = newDate
    }
    
    const changeDay = (direction) => {
      const newDate = new Date(currentDate.value)
      newDate.setDate(newDate.getDate() + direction)
      currentDate.value = newDate
    }
    
    return {
      events,
      isLoading,
      error,
      view,
      currentDate,
      showModal,
      selectedEvent,
      currentPeriodLabel,
      toggleModal,
      openEventModal,
      handleAddEvent,
      changePeriod,
      changeDay
    }
  }
}
</script>
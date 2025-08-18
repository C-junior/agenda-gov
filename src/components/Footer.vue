<template>
  <footer class="bg-gray-800 text-white text-center p-4 mt-auto">
    <p>&copy; {{ currentYear }} Governo do Estado do Tocantins. Todos os direitos reservados.</p>
  </footer>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AppFooter',
  setup() {
    const currentYear = new Date().getFullYear()
    return {
      currentYear
    }
  }
}
</script>
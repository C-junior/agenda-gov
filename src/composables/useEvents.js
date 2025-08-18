import { ref, onMounted } from 'vue'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBCWO9zD-IFn321eG68Z0YIOp9p1nw2RJE",
  authDomain: "agendagov-bb69e.firebaseapp.com",
  projectId: "agendagov-bb69e",
  storageBucket: "agendagov-bb69e.firebasestorage.app",
  messagingSenderId: "144147215963",
  appId: "1:144147215963:web:ec435d38a495e42653b17e"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export function useEvents() {
  const events = ref([])
  const isLoading = ref(true)
  const error = ref(null)

  const fetchEvents = () => {
    isLoading.value = true
    const q = query(collection(db, 'events'))
    onSnapshot(q, (snapshot) => {
      events.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      isLoading.value = false
    }, (err) => {
      console.error("Error fetching events: ", err)
      error.value = "Não foi possível carregar a agenda."
      isLoading.value = false
    })
  }

  const addEvent = async (event) => {
    try {
      await addDoc(collection(db, 'events'), event)
      return { success: true }
    } catch (err) {
      console.error("Error adding event: ", err)
      return { success: false, error: 'Ocorreu um erro ao salvar o evento.' }
    }
  }

  onMounted(() => {
    fetchEvents()
  })

  return {
    events,
    isLoading,
    error,
    addEvent,
    fetchEvents
  }
}
import { ref, onMounted } from 'vue'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
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
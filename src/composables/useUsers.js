import { ref } from 'vue'
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore'

const users = ref([])
const isLoading = ref(false)
const error = ref(null)
const db = getFirestore()

// Simple version - fetch users from Firestore only
const fetchUsers = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    // Get all user documents from the 'users' collection
    const usersCollection = collection(db, 'users')
    const usersSnapshot = await getDocs(usersCollection)
    
    const usersList = []
    usersSnapshot.forEach((doc) => {
      const userData = doc.data()
      usersList.push({
        uid: doc.id,
        ...userData
      })
    })
    
    // Sort users by email for better display
    usersList.sort((a, b) => {
      const emailA = (a.email || '').toLowerCase()
      const emailB = (b.email || '').toLowerCase()
      return emailA.localeCompare(emailB)
    })
    
    users.value = usersList
  } catch (err) {
    console.error('Error fetching users:', err)
    error.value = 'Falha ao carregar usuários. Tente novamente mais tarde.'
  } finally {
    isLoading.value = false
  }
}

const updateUserRole = async (uid, newRole) => {
  try {
    const userDocRef = doc(db, 'users', uid)
    await updateDoc(userDocRef, { role: newRole })
    return { success: true }
  } catch (err) {
    console.error('Error updating user role:', err)
    return { success: false, error: 'Falha ao atualizar papel do usuário.' }
  }
}

export function useUsers() {
  return {
    users,
    isLoading,
    error,
    fetchUsers,
    updateUserRole
  }
}
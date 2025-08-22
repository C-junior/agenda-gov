import { ref, onMounted, computed } from 'vue'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const user = ref(null)
const userRole = ref(null)
const auth = getAuth()
const db = getFirestore()

const fetchUserRole = async (uid, email) => {
  if (!uid) return
  try {
    const userDocRef = doc(db, 'users', uid)
    const userDoc = await getDoc(userDocRef)
    if (userDoc.exists()) {
      userRole.value = userDoc.data().role
    } else {
      // If user document doesn't exist, create it with a default 'viewer' role
      console.log('Creating new user document for UID:', uid)
      await setDoc(userDocRef, { 
        role: 'viewer',
        email: email // Store email for easier identification
      })
      userRole.value = 'viewer'
      console.log('User document created successfully')
    }
  } catch (error) {
    console.error('Error fetching/creating user role:', error)
    // Even if we can't fetch the role, we should still consider the user logged in
    userRole.value = 'viewer' // Default fallback
  }
}

onAuthStateChanged(auth, async (firebaseUser) => {
  if (firebaseUser) {
    console.log('User logged in:', firebaseUser.uid)
    user.value = firebaseUser
    await fetchUserRole(firebaseUser.uid, firebaseUser.email)
  } else {
    console.log('User logged out')
    user.value = null
    userRole.value = null
  }
})

const login = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
}

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  await signInWithPopup(auth, provider)
}

const logout = async () => {
  await signOut(auth)
}

// Simple admin check - you can modify this to check for specific admin emails
const isAdmin = computed(() => {
  // For now, we'll just check if the user has a specific email
  // You should replace 'admin@example.com' with your actual admin email
  return user.value && user.value.email === 'inglescursoone@gmail.com'
})

export function useAuth() {
  return {
    user,
    userRole,
    login,
    loginWithGoogle,
    logout,
    isRegister: computed(() => userRole.value === 'register'),
    isAdmin
  }
}

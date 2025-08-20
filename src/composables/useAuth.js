import { ref, onMounted, computed } from 'vue'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const user = ref(null)
const userRole = ref(null)
const auth = getAuth()
const db = getFirestore()

const fetchUserRole = async (uid) => {
  if (!uid) return
  const userDocRef = doc(db, 'users', uid)
  const userDoc = await getDoc(userDocRef)
  if (userDoc.exists()) {
    userRole.value = userDoc.data().role
  } else {
    // If user document doesn't exist, create it with a default 'viewer' role
    await setDoc(userDocRef, { role: 'viewer' })
    userRole.value = 'viewer'
  }
}

onAuthStateChanged(auth, async (firebaseUser) => {
  if (firebaseUser) {
    user.value = firebaseUser
    await fetchUserRole(firebaseUser.uid)
  } else {
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

export function useAuth() {
  return {
    user,
    userRole,
    login,
    loginWithGoogle,
    logout,
    isRegister: computed(() => userRole.value === 'register')
  }
}

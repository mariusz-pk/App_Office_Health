import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { initializeFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth();

// Test connection
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();

export const provider = new GoogleAuthProvider();

export const signIn = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error: any) {
    console.error("Login error:", error);
    if (error.code === 'auth/unauthorized-domain') {
      alert("Błąd: Domenę tej aplikacji należy dodać do autoryzowanych domen w ustawieniach Firebase Authentication (Authentication -> Ustawienia -> Autoryzowane domeny).");
    } else {
      alert("Błąd logowania: " + error.message);
    }
  }
};
export const logOut = () => signOut(auth);

// Provide auth state listener
export function observeAuthState(callback: (user: any) => void) {
  return onAuthStateChanged(auth, callback);
}

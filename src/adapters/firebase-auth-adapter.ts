import { initializeFirebaseApp, getFirebaseOptions } from "@/config/firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  User,
  onAuthStateChanged,
  OAuthProvider,
  updateProfile, // Import updateProfile
} from "firebase/auth";

// Initialize Firebase app using `firebaseConfig.ts`
const firebaseApp = initializeFirebaseApp();

// Firebase Auth instance
const auth = getAuth(firebaseApp);

// Define an interface for the adapter
export interface AuthAdapter {
  loginWithEmailPassword(email: string, password: string): Promise<User>;
  registerWithEmailPassword(
    email: string,
    password: string,
    displayName: string
  ): Promise<User>;
  loginWithGoogle(): Promise<User>;
  loginWithApple(): Promise<User>;
  sendPasswordReset(email: string): Promise<void>;
  logout(): Promise<void>;
  onAuthStateChange(callback: (user: User | null) => void): void;
  getCurrentUser(): User | null;
}

// Implement the Firebase-based adapter
const firebaseAuthAdapter: AuthAdapter = {
  async loginWithEmailPassword(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  async registerWithEmailPassword(email, password, displayName) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
      // Use updateProfile function
      await updateProfile(userCredential.user, { displayName });
    }
    return userCredential.user;
  },

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  },

  async loginWithApple() {
    const provider = new OAuthProvider("apple.com");
    provider.addScope("email");
    provider.addScope("name");
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  },

  async sendPasswordReset(email) {
    await sendPasswordResetEmail(auth, email);
  },

  async logout() {
    await signOut(auth);
  },

  onAuthStateChange(callback) {
    onAuthStateChanged(auth, callback);
  },

  getCurrentUser() {
    return auth.currentUser;
  },
};

export default firebaseAuthAdapter;

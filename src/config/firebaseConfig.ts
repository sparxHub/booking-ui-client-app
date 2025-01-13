import { FirebaseOptions, initializeApp } from "firebase/app";

export const firebaseConfig: Record<string, FirebaseOptions> = {
  web: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!, // Optional
  },
  android: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_ANDROID_API_KEY!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_ANDROID_APP_ID!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_ANDROID_MESSAGING_SENDER_ID!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_ANDROID_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_ANDROID_STORAGE_BUCKET!,
  },
  ios: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_IOS_API_KEY!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_IOS_APP_ID!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_IOS_MESSAGING_SENDER_ID!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_IOS_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_IOS_STORAGE_BUCKET!,
  },
};

// Function to get the appropriate Firebase options based on the platform
export const getFirebaseOptions = (): FirebaseOptions => {
  // if (typeof window === "undefined") {
  //   throw new Error("Firebase options should only be accessed on the client");
  // }

  // const platform = navigator.userAgent.toLowerCase();

  // if (/android/.test(platform)) return firebaseConfig.android;
  // if (/iphone|ipad|ipod/.test(platform)) return firebaseConfig.ios;

  // Default to web
  return firebaseConfig.web;
};

// Initialize Firebase App
export const initializeFirebaseApp = () => {
  const app = initializeApp(getFirebaseOptions());
  return app;
};

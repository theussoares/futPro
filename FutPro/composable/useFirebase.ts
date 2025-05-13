import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export const useFirebase = () => {

    const runtimeConfig = useRuntimeConfig();

    const firebaseConfig = {
        apiKey: runtimeConfig.public.firebase_apiKey,
        authDomain: runtimeConfig.public.firebase_authDomain,
        projectId: runtimeConfig.public.firebase_projectId,
        storageBucket: runtimeConfig.public.firebase_storageBucket,
        messagingSenderId: runtimeConfig.public.firebase_messagingSenderId,
        appId: runtimeConfig.public.firebase_appId,
    }

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    return {
        auth, provider, signInWithPopup, signOut
    }
}
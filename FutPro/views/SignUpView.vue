<template>
  <div class="min-h-dvh flex flex-col justify-center items-center px-6 overflow-y-auto">
    <AuthForm
      title="Sign Up"
      :isSignUp="true"
      @submit="handleSignUp"
      @toggleForm="goToLogin"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
//@ts-ignore
import { useFirebase } from "~/composable/useFirebase";
//@ts-ignore
import { useUserStore } from "@/store/useUserStore";

const router = useRouter();
const { auth } = useFirebase();
const userStore = useUserStore();
const handleSignUp = async (form: {
  name: string;
  email: string;
  telefone: string;
  role: string;
}) => {
  const authUser = auth.currentUser;
  const db = getFirestore();

  if (authUser) {
    // Atualiza o nome (caso o usuário altere)
    await updateProfile(authUser, {
      displayName: form.name,
    });

    // Salva telefone e informações no Firestore
    await setDoc(
      doc(db, "users", authUser.uid),
      {
        telefone: form.telefone.replace(/\D/g, ""),
        nome: form.name,
        email: form.email,
        photoURL: authUser.photoURL,
        role: form.role,
      },
      { merge: true }
    );

    userStore.setUser({
      ...userStore.user,
      nome: form.name,
      telefone: form.telefone.replace(/\D/g, ""),
      role: form.role,
    });

    if (form.role === "admin") {
      router.push("/admin/home");
    } else if (form.role === "owner") {
      router.push("/owner/home");
    } else if (form.role === "judge") {
      router.push("/judge/home");
    } else {
      router.push("/user/home");
    }
  }
};

const goToLogin = () => {
  router.push("/");
};
</script>

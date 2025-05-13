<template>
  <div class="min-h-dvh flex flex-col justify-center items-center p-6">
    <AuthForm
      title="Faça login"
      :isSignUp="false"
      @submit="handleLogin"
      @toggleForm="goToSignUp"
      @cadastroComplete="handleLogin"
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
const route = useRoute();
const { auth } = useFirebase();
const userStore = useUserStore();
const versionStore = useVersionStore();
const authUser = auth.currentUser;
const db = getFirestore();

onBeforeMount(() => {
  if(route.params?.version == "B") versionStore.setVersion("B");
  console.log("Versão:", versionStore.getVersion);
})

const handleLogin = async (form: {
  email: string;
  password: string;
  name: string;
  telefone: string;
  role: string;
}) => {
  console.log("Login realizado:", form, authUser);
  if (authUser || form.role) {
    // Salva telefone e informações no Firestore
    if(authUser)
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

    console.log("Usuário atualizado no store:", userStore.user);
    if(form.role){
      if (form.role === "admin") {
        console.log("Admin");
        router.push("/admin/home");
      } else if (form.role === "owner") {
        router.push("/owner/home");
      } else if (form.role === "judge") {
        router.push("/judge/home");
      } else {
        router.push("/user/home");
      }
    }
  }
  // Exemplo: após login, redirecionar
  // router.push('/dashboard')
};

const goToSignUp = () => {
  router.push("/signup");
};
</script>

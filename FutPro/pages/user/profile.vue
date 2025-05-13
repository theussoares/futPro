<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Meu Perfil</h1>

    <form @submit.prevent="updateProfile" class="space-y-4">
      <div class="flex flex-col gap-2">
        <label for="name" class="text-sm font-medium">Nome</label>
        <input
          id="name"
          v-model="user.name"
          type="text"
          placeholder="Nome completo"
          class="border rounded px-4 py-2"
          required
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="email" class="text-sm font-medium">Email</label>
        <input
          id="email"
          v-model="user.email"
          type="email"
          placeholder="Email"
          class="border rounded px-4 py-2"
          required
        />
      </div>

      <button
        type="submit"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Atualizar Perfil
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
// @ts-ignore
import { useFirebase } from '@/composable/useFirebase';

definePageMeta({
  layout: 'user-layout',
  middleware: 'role-check',
});

const { auth } = useFirebase();
const db = getFirestore();
const router = useRouter();

const user = ref<any>({
  name: '',
  email: ''
});

const fetchUserProfile = async () => {
  if (!auth.currentUser) return;

  const userDocRef = doc(db, 'users', auth.currentUser.uid);
  const userSnap = await getDoc(userDocRef);

  if (userSnap.exists()) {
    user.value = userSnap.data();
  }
};

const updateProfile = async () => {
  if (!auth.currentUser) return;

  const userDocRef = doc(db, 'users', auth.currentUser.uid);
  await updateDoc(userDocRef, {
    name: user.value.name,
    email: user.value.email
  });

  router.push('/user/home'); // Redirecionar após atualização
};

onMounted(() => {
  fetchUserProfile();
});
</script>

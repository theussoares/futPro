<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Criar Novo Time</h1>

    <div v-if="loading" class="text-gray-500">Carregando torneios...</div>

    <form v-else @submit.prevent="createTeam" class="flex flex-col gap-4">

      <!-- Nome do Time -->
      <input
        v-model="form.name"
        type="text"
        placeholder="Nome do Time"
        class="border rounded px-4 py-2"
        required
      />

      <!-- Torneio -->
      <select
        v-model="form.tournamentId"
        class="border rounded px-4 py-2"
        required
      >
        <option value="" disabled selected>Selecione um Torneio</option>
        <option
          v-for="tournament in tournaments"
          :key="tournament.id"
          :value="tournament.id"
        >
          {{ tournament.name }}
        </option>
      </select>

      <!-- Logo (opcional) -->
      <input
        v-model="form.logoUrl"
        type="text"
        placeholder="URL da Logo (opcional)"
        class="border rounded px-4 py-2"
      />

      <!-- Botão de Criar -->
      <button
        type="submit"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Criar Time
      </button>

    </form>

    <p v-if="successMessage" class="text-green-600 mt-4">{{ successMessage }}</p>
    <p v-if="errorMessage" class="text-red-600 mt-4">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
// @ts-ignore
import { useFirebase } from '@/composable/useFirebase';

definePageMeta({
  layout: 'owner-layout',
  middleware: 'role-check',
});

const { auth } = useFirebase();
const db = getFirestore();

const form = ref({
  name: '',
  logoUrl: '',
  tournamentId: '',
});

const tournaments = ref<any[]>([]);
const loading = ref(true);

const successMessage = ref('');
const errorMessage = ref('');

const fetchTournaments = async () => {
  const snapshot = await getDocs(collection(db, 'tournaments'));
  tournaments.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  loading.value = false;
};

const createTeam = async () => {
  if (!auth.currentUser) {
    errorMessage.value = "Usuário não autenticado.";
    return;
  }

  try {
    await addDoc(collection(db, 'teams'), {
      name: form.value.name,
      logoUrl: form.value.logoUrl,
      tournamentId: form.value.tournamentId,
      ownerId: auth.currentUser.uid,
      status: 'pending',
      createdAt: new Date()
    });

    successMessage.value = 'Time criado e aguardando aprovação!';
    errorMessage.value = '';
    form.value = { name: '', logoUrl: '', tournamentId: '' };
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Erro ao criar time.';
    successMessage.value = '';
  }
};

onMounted(() => {
  fetchTournaments();
});
</script>

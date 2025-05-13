<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Times Participantes</h1>

    <div v-if="loading" class="text-gray-500">Carregando times...</div>

    <div v-else-if="teams.length === 0" class="text-gray-500">
      Nenhum time registrado ainda.
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="team in teams"
        :key="team.id"
        class="bg-white p-4 rounded-lg shadow space-y-2"
      >
        <h2 class="text-xl font-semibold">{{ team.name }}</h2>
        <p class="text-gray-500 text-sm">Treinador: {{ team.ownerName }}</p>
        <p class="text-gray-500 text-sm">Membros: {{ team.players.length }} jogadores</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// @ts-ignore
import { useFirebase } from '@/composable/useFirebase';

definePageMeta({
  layout: 'user-layout',
  middleware: 'role-check',
});

const { auth } = useFirebase();
const db = getFirestore();

const teams = ref<any[]>([]);
const loading = ref(true);

const fetchTeams = async () => {
  const snapshot = await getDocs(collection(db, 'teams'));
  teams.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  loading.value = false;
};

onMounted(() => {
  fetchTeams();
});
</script>

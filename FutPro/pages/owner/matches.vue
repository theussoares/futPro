<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Partidas do Seu Time</h1>

    <div v-if="loading" class="text-gray-500">Carregando partidas...</div>

    <div v-else-if="matches.length === 0" class="text-gray-500">
      Nenhuma partida agendada ainda.
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="match in matches"
        :key="match.id"
        class="bg-white p-4 rounded-lg shadow space-y-2"
      >
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">
            {{ match.teamAName }} vs {{ match.teamBName }}
          </h2>
          <span class="text-gray-600 text-sm">
            {{ formatDate(match.date) }}
          </span>
        </div>

        <p class="text-gray-500 text-sm">
          Local: {{ match.location || 'Não definido' }}
        </p>

        <div v-if="match.status === 'scheduled'" class="mt-4">
          <p class="text-gray-600">Partida agendada. Aguarde a confirmação.</p>
        </div>

        <div v-else-if="match.status === 'in_progress'" class="text-yellow-600 font-semibold">
          Partida em andamento...
        </div>

        <div v-else-if="match.status === 'finished'" class="text-green-600 font-semibold">
          Partida finalizada
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
// @ts-ignore
import { useFirebase } from '@/composable/useFirebase';

definePageMeta({
  layout: 'owner-layout',
  middleware: 'role-check',
});

const { auth } = useFirebase();
const db = getFirestore();

const matches = ref<any[]>([]);
const loading = ref(true);

const fetchMatches = async () => {
  const snapshot = await getDocs(collection(db, 'matches'));
  matches.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  loading.value = false;
};

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

onMounted(() => {
  fetchMatches();
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Iniciar Partida</h1>

    <div v-if="loading" class="text-gray-500">Carregando partida...</div>

    <div v-else-if="match === null" class="text-gray-500">
      Partida não encontrada.
    </div>

    <div v-else class="space-y-4">
      <h2 class="text-xl font-semibold">
        {{ match.teamAName }} vs {{ match.teamBName }}
      </h2>
      <p>Data: {{ formatDate(match.date) }}</p>
      <p>Local: {{ match.location || 'Não definido' }}</p>

      <button
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        @click="startMatch"
      >
        Iniciar Partida
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
// @ts-ignore
import { useFirebase } from '@/composable/useFirebase';

definePageMeta({
  layout: 'judge-layout',
  middleware: 'role-check',
});

const route = useRoute();
const router = useRouter();
const { auth } = useFirebase();
const db = getFirestore();

const match = ref<any | null>(null);
const loading = ref(true);

const fetchMatch = async (matchId: string) => {
  const docRef = doc(db, 'matches', matchId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    match.value = docSnap.data();
  }

  loading.value = false;
};

const startMatch = async () => {
  if (match.value) {
    const matchRef = doc(db, 'matches', match.value.id);
    await updateDoc(matchRef, { status: 'in_progress' });

    router.push(`/judge/add-event?id=${match.value.id}`);
  }
};

onMounted(() => {
  const matchId = route.query.id as string;
  fetchMatch(matchId);
});

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
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Times no Torneio</h1>

    <div v-if="loading" class="text-gray-500">Carregando times...</div>

    <div v-else-if="teams.length === 0" class="text-gray-500">
      Nenhum time encontrado para este torneio.
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="team in teams"
        :key="team.id"
        class="bg-white p-4 rounded-lg shadow space-y-2"
      >
        <h2 class="text-xl font-semibold">{{ team.name }}</h2>
        <p>Status: <span class="font-bold capitalize">{{ team.status }}</span></p>

        <div class="flex gap-2" v-if="team.status === 'pending'">
          <button
            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            @click="updateStatus(team.id, 'approved')"
          >
            Aprovar
          </button>
          <button
            class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            @click="updateStatus(team.id, 'rejected')"
          >
            Rejeitar
          </button>
        </div>

        <p v-else-if="team.status === 'approved'" class="text-green-600 font-semibold">
          Time Aprovado
        </p>

        <p v-else-if="team.status === 'rejected'" class="text-red-600 font-semibold">
          Time Rejeitado
        </p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
// @ts-ignore
import { useFirebase } from '@/composable/useFirebase';

definePageMeta({
  layout: 'admin-layout',
  middleware: 'role-check',
});

const { auth } = useFirebase();
const route = useRoute();
const router = useRouter();
const db = getFirestore();

const tournamentId = route.query.id as string;
const teams = ref<any[]>([]);
const loading = ref(true);

const fetchTeams = async () => {
  if (!tournamentId) {
    router.push('/admin/home');
    return;
  }

  const q = query(collection(db, 'teams'), where('tournamentId', '==', tournamentId));
  const snapshot = await getDocs(q);

  teams.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  loading.value = false;
};

const updateStatus = async (teamId: string, status: 'approved' | 'rejected') => {
  const teamRef = doc(db, 'teams', teamId);
  await updateDoc(teamRef, { status });
  await fetchTeams();
};

onMounted(() => {
  fetchTeams();
});
</script>

<template>
  <div class="min-h-dvh flex flex-col bg-gray-50 pb-16">

    <!-- Header -->
    <header class="flex justify-between items-center p-6">
      <h1 class="text-2xl font-bold">Tournaments</h1>
      <button
        aria-label="Create New Tournament"
        @click="goToCreate"
        class="text-3xl text-blue-600 hover:text-blue-800"
      >
        +
      </button>
    </header>

    <!-- Conteúdo -->
    <main class="flex-1 px-6 space-y-4">
      <TournamentCard
        v-for="tournament in tournaments"
        :key="tournament.id"
        :tournament="tournament"
        @click="goToManage(tournament.id)"
      />
    </main>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// @ts-ignore
import { useFirebase } from '@/composable/useFirebase';
import TournamentCard from '@/components/TournamentCard.vue';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'admin-layout',
  middleware: 'role-check',
});

const { auth } = useFirebase();
const router = useRouter();
const db = getFirestore();

const tournaments = ref<any[]>([]);

const fetchTournaments = async () => {
  const snapshot = await getDocs(collection(db, 'tournaments'));
  tournaments.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

const goToCreate = () => {
  router.push('/admin/create-tournament');
};

const goToManage = (id: string) => {
  router.push(`/admin/manage-tournament?id=${id}`);
};

onMounted(() => {
  fetchTournaments();
});
</script>

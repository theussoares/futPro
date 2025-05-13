<template>
  <div class="p-6">
    <header class="flex justify-between items-center p-6">
      <h1 class="text-2xl font-bold mb-6">Meus Times</h1>
      <button
        aria-label="Create New Tournament"
        @click="goToCreate"
        class="text-3xl text-blue-600 hover:text-blue-800"
      >
        +
      </button>
    </header>

    <div v-if="loading" class="text-gray-500">Carregando times...</div>

    <div v-else-if="teams.length === 0" class="text-gray-500">
      Nenhum time criado ainda.
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="team in teams"
        :key="team.id"
        class="bg-white p-4 rounded-lg shadow space-y-2"
      >
        <h2 class="text-xl font-semibold">{{ team.name }}</h2>
        <p>
          Status: <span class="font-bold capitalize">{{ team.status }}</span>
        </p>

        <div v-if="team.status === 'approved'" class="mt-2">
          <button
            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            @click="goToPlayers(team.id)"
          >
            Gerenciar Jogadores
          </button>
        </div>

        <div
          v-else-if="team.status === 'pending'"
          class="text-yellow-600 font-semibold"
        >
          Aguardando aprovação do administrador.
        </div>

        <div
          v-else-if="team.status === 'rejected'"
          class="text-red-600 font-semibold"
        >
          Solicitação rejeitada.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
// @ts-ignore
import { useFirebase } from "@/composable/useFirebase";

definePageMeta({
  layout: "owner-layout",
  middleware: "role-check",
});

const { auth } = useFirebase();
const db = getFirestore();
const router = useRouter();

const teams = ref<any[]>([]);
const loading = ref(true);

const fetchTeams = async () => {
  const q = query(
    collection(db, "teams"),
    where("ownerId", "==", auth.currentUser?.uid)
  );
  const snapshot = await getDocs(q);

  teams.value = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  loading.value = false;
};

const goToPlayers = (teamId: string) => {
  // Futuro: criar rota de gerenciar jogadores
  router.push(`/owner/create-player?teamId=${teamId}`);
};

const goToCreate = () => {
  router.push('/owner/create-team');
};

onMounted(() => {
  fetchTeams();
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Torneios</h1>

    <div v-if="loading" class="text-gray-500">Carregando torneios...</div>

    <div v-else>
      <div
        v-for="tournament in tournaments"
        :key="tournament.id"
        class="bg-white p-4 rounded-lg shadow space-y-2"
      >
        <h2 class="text-xl font-semibold">{{ tournament.name }}</h2>
        <p><strong>Início:</strong> {{ tournament.startDate }}</p>
        <p><strong>Fim:</strong> {{ tournament.endDate }}</p>

        <div v-if="!tournament.judges.includes(userId)">
          <button
            class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            @click="requestJudge(tournament.id)"
          >
            Solicitar Participação como Juiz
          </button>
        </div>
        <div v-else>
          <p class="text-green-600">Você já se inscreveu como juiz para este torneio.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getFirestore, collection, getDocs, addDoc, doc, arrayUnion, updateDoc } from "firebase/firestore";
// @ts-ignore
import { useFirebase } from "@/composable/useFirebase";
import { useUserStore } from "@/store/useUserStore";

const db = getFirestore();
const userStore = useUserStore();
const userId = userStore.user?.uid;  // Recupera o ID do usuário logado
const tournaments = ref<any[]>([]);
const loading = ref(true);

const fetchTournaments = async () => {
  const querySnapshot = await getDocs(collection(db, "tournaments"));
  tournaments.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  loading.value = false;
};

const requestJudge = async (tournamentId: string) => {
  if (!userId) return;

  // Adiciona o ID do juiz na lista de juízes solicitados para o torneio
  const tournamentRef = doc(db, "tournaments", tournamentId);
  await updateDoc(tournamentRef, {
    judges: arrayUnion(userId),  // Adiciona o juiz à lista de juízes solicitados
  });

  alert("Sua solicitação para ser juiz foi enviada para o admin!");
};

onMounted(() => {
  fetchTournaments();
});
</script>

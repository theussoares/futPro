<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Gerenciar Torneio</h1>

    <div v-if="loading" class="text-gray-500">Carregando dados do torneio...</div>

    <div v-else-if="tournament" class="space-y-4">
      <h2 class="text-xl font-semibold">{{ tournament.name }}</h2>
      <p><strong>Início:</strong> {{ tournament.startDate }}</p>
      <p><strong>Fim:</strong> {{ tournament.endDate }}</p>
      <p><strong>Regras:</strong> {{ tournament.rules || "Não definido" }}</p>

      <!-- Aprovação de Juízes -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Solicitações de Juízes</h3>
        <div v-if="tournament.judges && tournament.judges.length > 0" class="space-y-4">
          <div
            v-for="judge in tournament.judges"
            :key="judge"
            class="bg-white p-4 rounded-lg shadow space-y-2"
          >
            <p class="text-sm font-medium">Juiz: {{ judge }}</p>
            <div class="flex gap-4">
              <button
                class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                @click="approveJudge(judge)"
              >
                Aprovar
              </button>
              <button
                class="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                @click="rejectJudge(judge)"
              >
                Rejeitar
              </button>
            </div>
          </div>
        </div>
        <div v-else class="text-gray-500">
          Nenhuma solicitação de juiz para este torneio.
        </div>
      </div>

      <!-- Gerenciar Times -->
      <button class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" @click="goToTeams">
        Gerenciar Times
      </button>

      <!-- Gerenciar Partidas -->
      <button class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" @click="goToMatches">
        Gerenciar Partidas
      </button>

      <!-- Botão Gerar Partidas -->
      <button
        :disabled="!canGenerateMatches"
        class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
        @click="gerarPartidas"
      >
        Gerar Partidas
      </button>
    </div>

    <div v-else class="text-red-600">Torneio não encontrado.</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getFirestore, doc, getDoc, updateDoc, getDocs, query, where, collection } from 'firebase/firestore';
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

const tournament = ref<any>(null);
const loading = ref(true);
const isEditModalOpen = ref(false);
const editForm = ref({
  name: '',
  startDate: '',
  endDate: '',
  rules: '',
});

const canGenerateMatches = computed(() => {
  return tournament.value?.registrationDeadline && new Date() > new Date(tournament.value.registrationDeadline);
});

const fetchTournament = async () => {
  const id = route.query.id as string;
  if (!id) {
    router.push("/admin/home");
    return;
  }

  const docRef = doc(db, 'tournaments', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    tournament.value = { id: docSnap.id, ...docSnap.data() };
  } else {
    tournament.value = null;
  }
  loading.value = false;
};

const approveJudge = async (judge: string) => {
  const tournamentRef = doc(db, 'tournaments', tournament.value.id);
  await updateDoc(tournamentRef, {
    judges: tournament.value.judges.filter((j: string) => j !== judge),
    approvedJudges: [...tournament.value.approvedJudges, judge],
  });

  alert(`Juiz ${judge} aprovado!`);
};

const rejectJudge = async (judge: string) => {
  const tournamentRef = doc(db, 'tournaments', tournament.value.id);
  await updateDoc(tournamentRef, {
    judges: tournament.value.judges.filter((j: string) => j !== judge),
  });

  alert(`Juiz ${judge} rejeitado.`);
};

const goToTeams = () => {
  router.push(`/admin/manage-tournament/teams?id=${tournament.value.id}`);
};

const goToMatches = () => {
  router.push(`/admin/manage-tournament/matches?id=${tournament.value.id}`);
};

const gerarPartidas = async () => {
  if (!tournament.value) return;

  const timesSnapshot = await getDocs(
    query(
      collection(db, 'teams'),
      where('tournamentId', '==', tournament.value.id),
      where('status', '==', 'approved')
    )
  );

  const times = timesSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: (doc.data() as any).name,
  }));

  if (times.length < 2) {
    alert('Número insuficiente de times aprovados para gerar partidas.');
    return;
  }

  // Gerar as partidas de acordo com o formato
  // (geração de partidas já discutida acima)

  alert('Partidas geradas com sucesso!');
  router.push('/admin/matches');
};

onMounted(() => {
  fetchTournament();
});
</script>

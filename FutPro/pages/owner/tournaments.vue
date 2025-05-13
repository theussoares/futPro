<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Torneios Disponíveis</h1>

    <div v-if="loading" class="text-gray-500">Carregando torneios...</div>

    <div v-else-if="tournaments.length === 0" class="text-gray-500">
      Nenhum torneio disponível.
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="tournament in tournaments"
        :key="tournament.id"
        class="bg-white p-4 rounded-lg shadow space-y-2"
      >
        <h2 class="text-xl font-semibold">{{ tournament.name }}</h2>
        <p><strong>Início:</strong> {{ tournament.startDate }}</p>
        <p><strong>Fim:</strong> {{ tournament.endDate }}</p>

        <div v-if="userTeams[tournament.id]">
          <p class="text-sm text-gray-500">
            Solicitação enviada! Status: <span class="font-bold">{{ userTeams[tournament.id].status }}</span>
          </p>

          <div v-if="userTeams[tournament.id].status === 'pending'" class="mt-2">
            <a
              :href="`https://wa.me/55${tournament.whatsappPhone}`"
              target="_blank"
              class="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Pagar Taxa
            </a>
          </div>
        </div>
        <div v-else>
          <button
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            @click="solicitarEntrada(tournament.id)"
          >
            Solicitar Entrada
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFirestore, collection, getDocs, addDoc, query, where } from 'firebase/firestore';
// @ts-ignore
import { useFirebase } from '@/composable/useFirebase'
import { useUserStore } from '@/store/useUserStore';

definePageMeta({
  layout: 'owner-layout',
  middleware: 'role-check'
});

const { auth } = useFirebase();
const db = getFirestore();
const userStore = useUserStore();

const tournaments = ref<any[]>([]);
const loading = ref(true);

// times do usuário (por torneio)
const userTeams = ref<Record<string, any>>({});

const fetchTournaments = async () => {
  const snapshot = await getDocs(collection(db, 'tournaments'));
  tournaments.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  await fetchUserTeams();
  loading.value = false;
};

const fetchUserTeams = async () => {
  const q = query(collection(db, 'teams'), where('ownerId', '==', auth.currentUser?.uid));
  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    const data = doc.data();
    userTeams.value[data.tournamentId] = { id: doc.id, ...data };
  });
};

const solicitarEntrada = async (tournamentId: string) => {
  await addDoc(collection(db, 'teams'), {
    name: "Seu Time", // Pode depois mudar para escolher nome
    logoUrl: "", // depois podemos adicionar upload
    tournamentId,
    ownerId: auth.currentUser?.uid,
    status: 'pending',
    createdAt: new Date()
  });

  await fetchUserTeams();
};

onMounted(() => {
  fetchTournaments();
});
</script>

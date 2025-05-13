<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Adicionar Evento à Partida</h1>

    <div v-if="loading" class="text-gray-500">Carregando dados da partida...</div>

    <div v-else-if="match === null" class="text-gray-500">
      Partida não encontrada.
    </div>

    <div v-else class="space-y-6">
      <h2 class="text-xl font-semibold">
        {{ match.teamAName }} vs {{ match.teamBName }}
      </h2>
      
      <div class="space-y-4">
        <div class="flex gap-4">
          <!-- Escolher Time -->
          <div class="flex flex-col gap-2">
            <label for="team" class="text-sm font-medium">Selecione o Time</label>
            <select v-model="event.team" id="team" class="border rounded px-4 py-2">
              <option value="teamA">Time A ({{ match.teamAName }})</option>
              <option value="teamB">Time B ({{ match.teamBName }})</option>
            </select>
          </div>

          <!-- Escolher Tipo de Evento -->
          <div class="flex flex-col gap-2">
            <label for="eventType" class="text-sm font-medium">Tipo de Evento</label>
            <select v-model="event.type" id="eventType" class="border rounded px-4 py-2">
              <option value="goal">Gol</option>
              <option value="yellow_card">Cartão Amarelo</option>
              <option value="red_card">Cartão Vermelho</option>
              <option value="substitution">Substituição</option>
            </select>
          </div>

          <!-- Escolher Jogador -->
          <div class="flex flex-col gap-2">
            <label for="player" class="text-sm font-medium">Jogador</label>
            <input
              v-model="event.player"
              type="text"
              placeholder="Nome do Jogador"
              class="border rounded px-4 py-2"
            />
          </div>
        </div>

        <button
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          @click="addEvent"
        >
          Adicionar Evento
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
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

const event = ref({
  team: 'teamA',
  type: 'goal',
  player: '',
});

const fetchMatch = async (matchId: string) => {
  const docRef = doc(db, 'matches', matchId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    match.value = docSnap.data();
  }

  loading.value = false;
};

const addEvent = async () => {
  if (match.value) {
    const eventData = {
      team: event.value.team,
      type: event.value.type,
      player: event.value.player,
      timestamp: new Date(),
    };

    const matchRef = doc(db, 'matches', match.value.id);
    await updateDoc(matchRef, {
      events: arrayUnion(eventData),
    });

    alert('Evento adicionado com sucesso!');
    event.value = { team: 'teamA', type: 'goal', player: '' }; // Reset form
  }
};

onMounted(() => {
  const matchId = route.query.id as string;
  fetchMatch(matchId);
});
</script>

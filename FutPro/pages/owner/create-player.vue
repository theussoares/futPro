<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Adicionar Jogador</h1>

    <form @submit.prevent="addPlayer" class="flex flex-col gap-4">

      <!-- Nome do Jogador -->
      <input
        v-model="form.name"
        type="text"
        placeholder="Nome do Jogador"
        class="border rounded px-4 py-2"
        required
      />

      <!-- Número da Camisa -->
      <input
        v-model="form.number"
        type="number"
        placeholder="Número da Camisa"
        class="border rounded px-4 py-2"
        required
      />

      <!-- Posição -->
      <select
        v-model="form.position"
        class="border rounded px-4 py-2"
        required
      >
        <option value="" disabled selected>Selecione a Posição</option>
        <option value="Atacante">Atacante</option>
        <option value="Meio-Campo">Meio-Campo</option>
        <option value="Defensor">Defensor</option>
        <option value="Goleiro">Goleiro</option>
      </select>

      <!-- Botão de Adicionar -->
      <button
        type="submit"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Adicionar Jogador
      </button>

    </form>

    <p v-if="successMessage" class="text-green-600 mt-4">{{ successMessage }}</p>
    <p v-if="errorMessage" class="text-red-600 mt-4">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
// @ts-ignore
import { useFirebase } from '@/composable/useFirebase';

definePageMeta({
  layout: 'owner-layout',
  middleware: 'role-check',
});

const { auth } = useFirebase();
const db = getFirestore();
const route = useRoute();
const router = useRouter();

const teamId = ref<string | null>(null);

const form = ref({
  name: '',
  number: '',
  position: ''
});

const successMessage = ref('');
const errorMessage = ref('');

onMounted(() => {
  teamId.value = route.query.teamId as string;
  if (!teamId.value) {
    router.push('/owner/home'); // Se não tiver teamId, volta
  }
});

const addPlayer = async () => {
  if (!auth.currentUser) {
    errorMessage.value = "Usuário não autenticado.";
    return;
  }

  if (!teamId.value) {
    errorMessage.value = "Time não encontrado.";
    return;
  }

  try {
    await addDoc(collection(db, 'players'), {
      name: form.value.name,
      number: form.value.number,
      position: form.value.position,
      teamId: teamId.value,
      ownerId: auth.currentUser.uid,
      createdAt: new Date()
    });

    successMessage.value = 'Jogador adicionado com sucesso!';
    errorMessage.value = '';
    form.value = { name: '', number: '', position: '' };
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Erro ao adicionar jogador.';
    successMessage.value = '';
  }
};
</script>

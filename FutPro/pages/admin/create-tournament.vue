<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Criar Novo Torneio</h1>

    <form @submit.prevent="createTournament" class="flex flex-col gap-4 overflow-y-auto">

      <div class="flex flex-col gap-2">
        <label for="name" class="text-sm font-medium">Nome do Torneio</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Nome do Torneio"
          class="border rounded px-4 py-2"
          required
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="startDate" class="text-sm font-medium">Data de Início</label>
        <input
          id="startDate"
          v-model="form.startDate"
          type="date"
          class="border rounded px-4 py-2"
          required
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="endDate" class="text-sm font-medium">Data de Término</label>
        <input
          id="endDate"
          v-model="form.endDate"
          type="date"
          class="border rounded px-4 py-2"
          required
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="registrationDeadline" class="text-sm font-medium">Data Final de Inscrição</label>
        <input
          id="registrationDeadline"
          v-model="form.registrationDeadline"
          type="date"
          class="border rounded px-4 py-2"
          required
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="format" class="text-sm font-medium">Formato do Torneio</label>
        <select
          id="format"
          v-model="form.format"
          class="border rounded px-4 py-2"
          required
        >
          <option value="" disabled selected>Selecione o Formato</option>
          <option value="mata-mata">Mata-Mata</option>
          <option value="pontos-corridos">Pontos Corridos (Ida e Volta)</option>
          <option value="grupos">Grupos + Mata-Mata</option>
        </select>
      </div>

      <div class="flex flex-col gap-2">
        <label for="daysBetweenMatches" class="text-sm font-medium">Dias entre Partidas</label>
        <input
          id="daysBetweenMatches"
          v-model="form.daysBetweenMatches"
          type="number"
          min="1"
          placeholder="Ex: 3 dias"
          class="border rounded px-4 py-2"
          required
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="whatsappPhone" class="text-sm font-medium">WhatsApp para Contato</label>
        <input
          id="whatsappPhone"
          v-model="form.whatsappPhone"
          type="tel"
          placeholder="Telefone com DDD (somente números)"
          class="border rounded px-4 py-2"
          required
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="rules" class="text-sm font-medium">Regras do Torneio</label>
        <textarea
          id="rules"
          v-model="form.rules"
          class="border rounded px-4 py-2"
          rows="4"
        />
      </div>

      <button
        type="submit"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Criar Torneio
      </button>
    </form>

    <p v-if="successMessage" class="text-green-600 mt-4">{{ successMessage }}</p>
    <p v-if="errorMessage" class="text-red-600 mt-4">{{ errorMessage }}</p>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
// @ts-ignore
import { useFirebase } from '@/composable/useFirebase';

definePageMeta({
  layout: 'admin-layout',
  middleware: 'role-check',
});

const { auth } = useFirebase();
const db = getFirestore();

const form = ref({
  name: '',
  startDate: '',
  endDate: '',
  registrationDeadline: '',
  format: '',
  daysBetweenMatches: '',
  whatsappPhone: '',
  rules: ''
});

const successMessage = ref('');
const errorMessage = ref('');

const createTournament = async () => {
  if (!auth.currentUser) {
    errorMessage.value = "Usuário não autenticado.";
    return;
  }

  try {
    await addDoc(collection(db, 'tournaments'), {
      name: form.value.name,
      startDate: form.value.startDate,
      endDate: form.value.endDate,
      registrationDeadline: form.value.registrationDeadline,
      format: form.value.format,
      daysBetweenMatches: Number(form.value.daysBetweenMatches),
      whatsappPhone: form.value.whatsappPhone.replace(/\D/g, ''),
      rules: form.value.rules,
      createdBy: auth.currentUser.uid,
      createdAt: serverTimestamp()
    });

    successMessage.value = 'Torneio criado com sucesso!';
    errorMessage.value = '';
    form.value = {
      name: '',
      startDate: '',
      endDate: '',
      registrationDeadline: '',
      format: '',
      daysBetweenMatches: '',
      whatsappPhone: '',
      rules: ''
    };
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Erro ao criar torneio.';
    successMessage.value = '';
  }
};
</script>

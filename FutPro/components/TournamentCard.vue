<template>
  <div class="bg-white p-4 rounded-lg shadow-sm flex flex-col gap-2">

    <!-- Nome do torneio -->
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-bold">{{ tournament.name }}</h2>
      <button aria-label="View Tournament" class="text-gray-400">
        ➔
      </button>
    </div>

    <!-- Infos adicionais -->
    <div class="text-gray-500 text-sm">
      <p>{{ tournament.location }}</p>
      <p>{{ tournament.start }}</p>
    </div>

    <!-- Ícones de ações -->
    <div class="flex justify-end gap-4 text-gray-400 mt-2">
      <button aria-label="Manage Players">
        <IconUsers />
      </button>
      <button aria-label="Edit Tournament">
        <IconEdit />
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
// import IconUsers from '@/components/icons/IconUsers.vue';
// import IconEdit from '@/components/icons/IconEdit.vue';

defineProps<{
  tournament: {
    id: number;
    name: string;
    location: string;
    start: string;
  }
}>();
</script>

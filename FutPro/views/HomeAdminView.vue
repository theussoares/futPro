<template>
  <div class="min-h-screen flex flex-col bg-gray-50">

    <!-- Header -->
    <header class="flex justify-between items-center p-6">
      <h1 class="text-2xl font-bold">Tournaments</h1>
      <button
        aria-label="Create New Tournament"
        @click="createTournament"
        class="text-3xl text-blue-600 hover:text-blue-800"
      >
        +
      </button>
    </header>

    <!-- Lista de Torneios -->
    <main class="flex-1 px-6 space-y-4">
      <TournamentCard
        v-for="tournament in tournaments"
        :key="tournament.id"
        :tournament="tournament"
      />
    </main>

    <!-- Navbar Admin -->
    <nav class="flex justify-around items-center p-4 border-t bg-white">
      <button aria-label="Home" class="text-blue-600">
        <IconHome />
      </button>
      <button aria-label="Tournaments" class="text-gray-400">
        <IconTrophy />
      </button>
      <button aria-label="Players" class="text-gray-400">
        <IconUsers />
      </button>
      <button aria-label="Settings" class="text-gray-400">
        <IconSettings />
      </button>
    </nav>

  </div>
</template>

<script setup lang="ts">
// import TournamentCard from '@/components/TournamentCard.vue';
// import IconHome from '@/components/icons/IconHome.vue';
// import IconTrophy from '@/components/icons/IconTrophy.vue';
// import IconUsers from '@/components/icons/IconUsers.vue';
// import IconSettings from '@/components/icons/IconSettings.vue';

const tournaments = [
  {
    id: 1,
    name: 'Premier League',
    location: 'Crtted | lona',
    start: 'Start of E7 Luno'
  },
  {
    id: 2,
    name: 'Cup 2004',
    location: 'Final match | Jona',
    start: 'Start Kewis and'
  },
  {
    id: 3,
    name: 'Summer Trophy',
    location: 'Briftstad | Jonam',
    start: 'Siamer ar Luno'
  },
];

// Criar novo torneio
const createTournament = () => {
  console.log('Navegar para tela de criação de torneio...');
  // Ex: router.push('/admin/create-tournament')
}
</script>

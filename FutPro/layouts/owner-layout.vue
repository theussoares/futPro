<template>
  <div class="min-h-screen flex flex-col pb-16">
    <slot />

    <BottomNav :items="ownerNavItems" />
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, TrophyIcon, UserGroupIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline';

const ownerNavItems = [
  { label: 'Home', to: '/owner/home', icon: HomeIcon },
  { label: 'Partidas', to: '/owner/matches', icon: TrophyIcon },
  { label: 'Classificação', to: '/owner/standings', icon: UserGroupIcon },
  { label: 'Perfil', to: '/owner/profile', icon: Cog6ToothIcon },
];
</script>

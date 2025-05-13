<template>
  <div class="min-h-screen flex flex-col pb-16">
    <slot />

    <BottomNav :items="userNavItems" />
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, TrophyIcon, UserGroupIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline';

const userNavItems = [
  { label: 'Home', to: '/user/home', icon: HomeIcon },
  { label: 'Partidas', to: '/user/matches', icon: TrophyIcon },
  { label: 'Classificação', to: '/user/standings', icon: UserGroupIcon },
  { label: 'Perfil', to: '/user/profile', icon: Cog6ToothIcon },
];
</script>

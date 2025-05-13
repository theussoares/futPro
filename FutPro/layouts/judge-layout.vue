<template>
  <div class="min-h-screen flex flex-col pb-16">
    <slot />

    <BottomNav :items="judgeNavItems" />
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, TrophyIcon, UserGroupIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline';

const judgeNavItems = [
  { label: 'Home', to: '/judge/home', icon: HomeIcon },
  { label: 'Partidas', to: '/judge/matches', icon: TrophyIcon },
  { label: 'Perfil', to: '/judge/profile', icon: Cog6ToothIcon },
];
</script>

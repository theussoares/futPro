<template>
  <div class="min-h-dvh flex flex-col">
    <slot />
    <div class="w-full h-[60px]"></div>
  </div>
  <BottomNav :items="adminNavItems" />
</template>

<script setup lang="ts">
import BottomNav from '@/components/BottomNav.vue';
import { HomeIcon, TrophyIcon, UserGroupIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline';

const adminNavItems = [
  { label: 'Home', to: '/admin/home', icon: HomeIcon },
  { label: 'Partidas', to: '/admin/matches', icon: TrophyIcon },
  { label: 'Perfil', to: '/admin/profile', icon: Cog6ToothIcon },
];
</script>

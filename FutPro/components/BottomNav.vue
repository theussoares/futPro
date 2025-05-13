<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-16">
    <button
      v-for="item in items"
      :key="item.to"
      :aria-label="item.label"
      @click="$router.push(item.to)"
      class="flex flex-col items-center text-sm"
    >
      <component :is="item.icon" class="w-6 h-6" />
      <span class="text-xs">{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
interface Props {
    items: { label: string; to: string; icon: any }[]
}

const props = defineProps<Props>();
</script>

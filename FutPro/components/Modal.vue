<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    @click.self="close"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md relative">
      <button
        class="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        @click="close"
        aria-label="Fechar"
      >
        ✖️
      </button>

      <!-- Conteúdo dinâmico -->
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <div class="relative w-full">
    <!-- Botão para abrir/fechar -->
    <label for="buttonRef" class="text-xs font-semibold text-gray-600">
      O que você quer fazer?
    </label>
    <button
      id="buttonRef"
      @click="toggleDropdown($event)"
      :aria-expanded="isOpen"
      :aria-controls="'dropdown-list'"
      class="w-full text-start border text-sm border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      role="combobox"
      :aria-activedescendant="isOpen ? `option-${highlightedIndex}` : undefined"
    >
      {{ selectedLabel }}
    </button>

    <!-- Lista de opções -->
    <div
      v-if="isOpen"
      id="dropdown-list"
      class="absolute z-10 mt-1 w-full overflow-y-scroll max-h-[100px] bg-white border border-gray-300 rounded-md shadow-lg"
      role="listbox"
    >
      <div
        v-for="(option, index) in options"
        :key="option.value"
        :id="`option-${index}`"
        role="option"
        :aria-selected="index === highlightedIndex"
        class="px-4 py-2 cursor-pointer hover:bg-blue-100 text-sm"
        :class="{
          'bg-blue-100': index === highlightedIndex,
          'bg-white': index !== highlightedIndex,
        }"
        @click="
          selectOption(option);
          emit('update', option.value);
        "
        @mouseover="highlightedIndex = index"
      >
        {{ option.label }}
      </div>
    </div>
    <p
      v-if="errorMessage"
      :id="`select-error`"
      class="text-xs text-red-600 mt-1"
      role="alert"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
  errorMessage?: string;
}

const isOpen = ref(false);
const props = defineProps<Props>();
const highlightedIndex = ref(0);
const selected = ref<{ label: string; value: string } | null>(null);
const emit = defineEmits(["update"]);

const options = [
  { label: "Criar um time", value: "owner" },
  { label: "Criar campeonatos", value: "admin" },
  { label: "Acompanhar campeonatos e times", value: "user" },
  { label: "Ser juiz", value: "judge"}
];

const buttonRef = ref<HTMLButtonElement | null>(null);

const selectedLabel = computed(
  () => selected.value?.label || "Selecione uma opção"
);

const toggleDropdown = (event: any) => {
  event.preventDefault(); // Evita que o evento de clique se propague para o documento
  isOpen.value = !isOpen.value;
};

const selectOption = (option: { label: string; value: string }) => {
  selected.value = option;
  isOpen.value = false;
};

// const handleKeydown = (e: KeyboardEvent) => {
//   if (!isOpen.value && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
//     isOpen.value = true;
//     return;
//   }
//   if (isOpen.value) {
//     if (e.key === 'ArrowDown') {
//       highlightedIndex.value = (highlightedIndex.value + 1) % options.length;
//       e.preventDefault();
//     } else if (e.key === 'ArrowUp') {
//       highlightedIndex.value = (highlightedIndex.value - 1 + options.length) % options.length;
//       e.preventDefault();
//     } else if (e.key === 'Enter') {
//       selectOption(options[highlightedIndex.value]);
//       e.preventDefault();
//     } else if (e.key === 'Escape') {
//       isOpen.value = false;
//       e.preventDefault();
//     }
//   }
// };
</script>

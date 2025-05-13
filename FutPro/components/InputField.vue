<template>
  <div class="flex flex-col gap-1 w-full">
    <label
      :for="id"
      class="text-xs font-semibold text-gray-600"
    >
      {{ label }}
    </label>

    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :maxlength="maxlength"
      @input="$emit('update:modelValue', $event.target?.value)"
      @blur="$emit('blur', $event.target?.value)"
      :aria-invalid="!!errorMessage"
      :aria-describedby="errorMessage ? `${id}-error` : undefined"
      :class="clsx('border border-blue-300 rounded-md text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500',{
        'bg-gray-100 cursor-not-allowed': disabled,
        'border-red-500 focus:ring-red-500': errorMessage,
        'focus:ring-blue-500': !errorMessage && !disabled,
      })"
    />

    <p
      v-if="errorMessage"
      :id="`${id}-error`"
      class="text-xs text-red-600 mt-1"
      role="alert"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import clsx from 'clsx'

defineProps<{
  id: string
  label: string
  placeholder: string
  type: string
  modelValue: string
  errorMessage?: string
  disabled?: boolean
  maxlength?: number
}>()

defineEmits(['update:modelValue', 'blur'])
</script>

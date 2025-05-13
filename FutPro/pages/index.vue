<template>
    <LoginView />
</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'role-check',
});
</script>

<style scoped>

</style>
<template>
  <div class="layout">
    <Header />
    <slot/>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

.layout{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6.125rem;
  width: 100dvw;
  height: 100dvh;
}

</style>
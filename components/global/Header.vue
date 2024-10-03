<script setup lang="ts">

</script>

<template>
  <div class="header">
    <h1 class="logo">easyflex</h1>
  </div>
</template>

<style scoped lang="scss">

.header {
  display: flex;
  height: 3rem;
  padding: 1rem 3rem;
  justify-content: space-between;
  align-items: center;

  .logo {
    color: var(--primary-logo);
    font-family: 'Roboto', sans-serif;
    font-size: 4rem;
    font-style: italic;
    font-weight: 700;
    line-height: normal;
  }
}

</style>
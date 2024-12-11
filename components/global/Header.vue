<script setup lang="ts">

</script>

<template>
  <div class="header">
    <h1 class="logo">easyflex</h1>
    <div class="navigation">
      <router-link to="/">Home</router-link>
      <router-link to="/flexworker">Flexworkers</router-link>
      <router-link to="/job">Jobs</router-link>
      <router-link to="/category">Skills</router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">

.header {
  display: flex;
  height: 3rem;
  width:calc(100% - 6rem);
  padding: 1rem 3rem;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  .logo {
    color: var(--primary-logo);
    font-family: 'Roboto', sans-serif;
    font-size: 4rem;
    font-style: italic;
    font-weight: 700;
    line-height: normal;
  }
  
  .navigation {
    display: flex;
    gap: var(--spacing-standard);
    font-family: 'Roboto', sans-serif;
    font-size: 1.5rem;
    font-weight: 500;
    line-height: normal;
    
    a{
      color: var(--primary-text);
      text-decoration: none;
    }
  }
}

</style>

<template>
  <div class="layout">
    <Header />
    <slot class="page"/>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
body{
  margin:0;
}

h1{
  margin:0;
}

h2{
  margin:0;
}

h3{
  margin:0;
}

.layout{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100dvh;
  overflow:hidden;
  
  .page{
    width:100%;
    height:100%;
    max-width: 2000px;
  }
  font-family: Montserrat, sans-serif;
  background: var(--background-color);
}

</style>
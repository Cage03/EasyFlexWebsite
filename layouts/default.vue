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
  width: 100dvw;
  height: 100dvh;
  
  .page{
    width:100%;
    max-width: 2000px;
  }
}

</style>
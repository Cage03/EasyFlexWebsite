<script setup lang="ts">
const router = useRouter();

  function directToHomepage(){
    router.push('/flexworker/');
  }
</script>

<template>
  <div class="not-found">
    <h1>Flexworker Not Found</h1>
    <p>The requested Flexworker could not be found. Please check the ID and try again</p>
    <UIButtonStandard class="button" :content="'Return to homepage'" @click="directToHomepage" />
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 5%;
}

.button {
  margin: auto;
}
</style>
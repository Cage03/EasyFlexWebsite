<script setup lang="ts">

let props = defineProps({
  title: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: false
  }
})
</script>

<template>

  <div class="box">
    <h1>{{title}}</h1>
    <p>{{content}}</p>
  </div>

</template>

<style scoped>

.box {
  background-color: #f9f9f9;
  border: 1px solid #c3c3c3;
  padding: 15px;
  margin: 15px;
}

.box h1 {
  font-size: 1.5em;
  margin: 0;
}

.box p {
  font-size: 1em;
}

</style>
<script setup lang="ts">

let props = defineProps(
    {
      content: {
        type: String,
        required: false
      }
    })
</script>

<template>
  <button class="button">
    {{content}}
  </button>
</template>

<style scoped>

.button {
  background-color: #FEC228;
  border: none;
  border-radius: 1rem;
  color: white;
  padding: 1rem;
  text-align: center;
  display: flex;
  font-size: 1.5rem;
  font-family: Montserrat,sans-serif;
  font-weight:600;
  font-style: italic;
}

</style>
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
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

</style>
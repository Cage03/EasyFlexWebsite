<script setup lang="ts">
import {IconType} from "~/types/global-types";

let props = defineProps(
    {
      content: {
        type: String,
        required: false
      },
      icon:{
        type: String as PropType<IconType>,
        required:false
      }
    })
</script>

<template>
  <button class="button">
    {{content}}
    <UIIcon v-if="icon" :icon="icon"/>
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
  font-size: 1rem;
  font-family: Montserrat,sans-serif;
  font-weight:600;
  font-style: italic;
  gap:0.5rem;
}

</style>
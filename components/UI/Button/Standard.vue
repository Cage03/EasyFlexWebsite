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
      },
      action: {
        type: Function,
        required: false,
        default: () => {}
      }
    })
</script>

<template>
  <button @click="action" class="button">
    {{content}}
    <UIIcon v-if="icon" class="icon" :icon="icon"/>
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
  cursor:pointer;
  align-items:center;
  flex-direction: row;
  transition: transform 0.25s ease-in-out, background-color 0.25s ease-in-out;
  
  .icon{
    margin-top:-0.5rem;
  }
  
  &:hover{
    transform: translateY(-0.2rem);
    transition: transform 0.25s ease-in-out, background-color 0.25s ease-in-out;
    background-color: var(--button-secondary-color);
    box-shadow: var(--shadow-four-sides);
  }
}

.red {
  background-color: #d23535;
}

</style>
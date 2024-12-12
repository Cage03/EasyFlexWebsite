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
      },
      color: {
        type: String,
        required: false,
        default: "yellow",
      }
    })
    
</script>

<template>
  <button @click="action" :class="color" class="button">
    {{content}}
    <UIIcon v-if="icon" class="icon" :icon="icon"/>
  </button>
</template>

<style scoped>

.button {
  background-color: #FEC228;
  border: none;
  border-radius: var(--border-radius-standard);
  color: white;
  padding: var(--padding-standard);
  text-align: center;
  display: flex;
  font-size: 1rem;
  font-family: Montserrat,sans-serif;
  font-weight:600;
  font-style: italic;
  gap:var(--spacing-small);
  cursor:pointer;
  align-items:center;
  flex-direction: row;
  transition: transform 0.25s ease-in-out, background-color 0.25s ease-in-out;

  
  &:hover{
    transform: translateY(-0.2rem);
    transition: transform 0.25s ease-in-out, background-color 0.25s ease-in-out;
    background-color: var(--button-secondary-color);
    box-shadow: var(--shadow-four-sides);
  }
}

.transparent {
  background-color: transparent;

  &:hover{
    transform: translateY(0);
    transition: transform 0.25s ease-in-out, background-color 0.25s ease-in-out;
    background-color: transparent;
    box-shadow: none;
  }
}

.red {
  background-color: #d23535;

  &:hover{
    transform: translateY(-0.2rem);
    transition: transform 0.25s ease-in-out, background-color 0.25s ease-in-out;
    background-color: var(--delete-button-secondary-color);
    box-shadow: var(--shadow-four-sides);
  }
}


</style>
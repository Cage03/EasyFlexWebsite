<template>
  <div class="search-bar">
    <input type="text" :value="modelValue" :placeholder="placeholder" @input="updateValue">
    <UIIcon :icon="IconType.Search"/>
  </div>
</template>

<script setup lang="ts">
import {IconType} from "~/types/global-types";

let props = defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style lang="scss">
.search-bar{
  position: relative;
  max-width:100%;
  width:100%;
  height:4.75rem;
  
  input{
    width:100%;
    padding:1.5rem 3rem;
    border-radius: 1rem;
    font-size: 1.5rem;
    font-family: Montserrat, sans-serif;
    font-style:italic;
    color: var(--text-primary-color);
  }
  
  svg{
    position: absolute;
    right:-3rem;
    top:1rem;
    transform: translateY(50%);
  }
}
</style>
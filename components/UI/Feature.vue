<script setup lang="ts">
const props = defineProps({
  title:{
    type: String,
    default: null
  },
});
</script>

<template>
  <div class="container">
  <div class="features">{{title}}</div>
  <slot></slot>
  </div>
</template>

<style scoped lang="scss">

.container {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-small);
}

.features {
  display: flex;
  padding: 0.3125rem;
  margin: 0.3125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-small);
  border-radius: 1rem;
  border: 1px solid var(--Primary-Solid, #4E8798);
  height: fit-content;

  color: #000;
  font-size: 1.25rem;
  font-style: italic;
  font-weight: 700;
  line-height: normal;
}

</style>
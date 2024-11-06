<script setup lang="ts">
import { defineProps, ref } from 'vue';
const props = defineProps({
  title: String,
  features: Array as PropType<string[]>,
  newFeature: String,
  addFeature: Function as PropType<(feature: string) => void>
});

const newFeatureInput = ref(props.newFeature);

function handleAddFeature() {
  if (newFeatureInput.value) {
    props.addFeature(newFeatureInput.value);
    newFeatureInput.value = '';
  }
}
</script>

<template>
  <div class="feature-box">
    <h1 class="feature-text">{{ title }}</h1>
    <div class="feature-container">
      <div v-for="feature in features" :key="feature" class="features">{{ feature }}</div>
      <div class="add-feature-container">
        <input placeholder="Add new feature" type="text" v-model="newFeatureInput">
        <button type="button" @click="handleAddFeature">Add</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.feature-box {
  display: flex;
  flex-direction: row;
  gap: 0.625rem;
  align-self: stretch;
  justify-content: space-between;
}

.feature-text{
  color: #000;
  font-size: 1.5rem;
  font-style: italic;
  font-weight: 700;
  line-height: normal;
}

.feature-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  border-radius: 1rem;
  border: 1px solid #000;
  max-width: 75%;
  min-height: 3rem;
}

.features {
  display: flex;
  padding: 0.3125rem;
  margin: 0.3125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  border-radius: 1rem;
  border: 1px solid var(--Primary-Solid, #4E8798);

  color: #000;
  font-size: 1.25rem;
  font-style: italic;
  font-weight: 700;
  line-height: normal;
}

.add-feature-container {
  display: flex;
  gap: 0.625rem;
  margin-left: auto;
}
</style>
<script setup lang="ts">
import { defineProps, ref } from 'vue';
import type {Skill} from "~/composables/useSkill";
const props = defineProps({
  title: {
    type: String,
    default: null
  },
  skills: {
    type: Array<Skill>,
    required: true
  }
});

</script>

<template>
  <div class="feature-box">
    <h1 class="feature-text">{{ title }}</h1>
    <div class="feature-container">
      <div v-for="skill in skills" class="features">{{ skill.name }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.feature-box {
  margin: 0.625rem;
  display: flex;
  text-align: start;
  flex-direction: row;
  gap: 0.625rem;
  align-self: stretch;
  align-items: center;
}

.feature-text{
  color: #000;
  font-size: 1.2rem;
  font-style: italic;
  font-weight: 700;
  line-height: normal;
  width: 10rem;
}

.feature-container{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-radius: 1rem;
  max-width: 75%;
  min-height: 3rem;
  border: 2px solid var(--Primary-Solid, #000000);
  height: fit-content;
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
  font-size: 1rem;
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
<script setup lang="ts">
import { computed } from 'vue';
import type {skill} from "~/composables/skill";
import {list} from "postcss";

const props = defineProps({
  skills: {
    type: Array<skill>,
    required: true
  }
})

// get category names from category ids using api/Category/GetById
// const getCategoryNames = async () => {
//   const categoryNames = await Promise.all(props.skills.map(async (skill: skill) => {
//     const response = await fetch(`https://api.example.com/api/Category/GetById/${skill}`);
//     const data = await response.json();
//     return data.name;
//   }));
//   return categoryNames;
// }
const skills = ref(props.skills);

const groupedSkills = computed(() => {
  return skills.value.reduce((acc, skill) => {
    if (!acc[skill.categoryId]) {
      acc[skill.categoryId] = [];
    }
    acc[skill.categoryId].push(skill);
    return acc;
  }, {} as Record<number, skill[]>);
});

watch(() => props.skills, (newSkills) => {
  skills.value = newSkills;
});

</script>

<template>
  <div>
    <UIFeatureBox
    v-for="(skills, categoryId) in groupedSkills"
    :key="categoryId"
    :title="`Category ${categoryId}`"
    :skills="skills"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
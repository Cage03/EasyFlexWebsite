<script setup lang="ts">
import { computed } from 'vue';
import {type Skill} from '~/composables/useSkill';

const props = defineProps({
  skills: {
    type: Array<Skill>,
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
const categoryNames = ref<Record<number, string>>({});

const fetchCategoryNames = async () => {
  const useCategory = UseCategory();
  const uniqueCategoryIds = [...new Set(skills.value.map(skill => skill.categoryId))];
  console.log("Unique Category IDs:", uniqueCategoryIds);

  const names = await Promise.all(uniqueCategoryIds.map(async (categoryId) => {
    try {
      const category = await useCategory.fetchCategoryById(categoryId);
      console.log("Fetched Category:", category);
      return { id: categoryId, name: category.name };
    } catch (error) {
      console.error(`Failed to fetch category with ID ${categoryId}:`, error);
      return { id: categoryId, name: `Category ${categoryId}` };
    }
  }));

  console.log("Category Names:", names);
  categoryNames.value = names.reduce((acc, { id, name }) => {
    acc[id] = name;
    return acc;
  }, {} as Record<number, string>);
};

const groupedSkills = computed(() => {
  return skills.value.reduce((acc, skill) => {
    if (!acc[skill.categoryId]) {
      acc[skill.categoryId] = { title: categoryNames.value[skill.categoryId] || `Category ${skill.categoryId}`, skills: [] };
    }
    acc[skill.categoryId].skills.push(skill);
    return acc;
  }, {} as Record<number, { title: string, skills: Skill[] }>);
});

watch(() => props.skills, (newSkills) => {
  skills.value = newSkills;
  fetchCategoryNames()
});

onMounted(() => {
  fetchCategoryNames();
});



</script>

<template>
  <div class="box">
    <UIFeatureBox
    v-for="(group, categoryId) in groupedSkills"
    :key="categoryId"
    :title="group.title"
    :skills="group.skills"
    />
  </div>
</template>

<style scoped lang="scss">

.box {
  width: 100%;
}

</style>
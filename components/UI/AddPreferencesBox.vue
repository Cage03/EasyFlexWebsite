﻿<script setup lang="ts">
import {type Category, UseCategory} from '~/composables/useCategory';
import CategoryListItem from "~/components/UI/CategoryListItem.vue";
import type { Preference } from "~/composables/useJob";
import type {Skill} from "~/composables/useSkill";

const props = defineProps<{
    skills : Skill[]
    preferences: Preference[];
}>();

let preferences = props.preferences;
let skills = props.skills;

const emit =  defineEmits<{
  close: []
  preferencesChanged: [value: Preference[]]
}>()
const { currentJob } = UseJob()
const responseCategories = ref<Category[]>([]);
const allCategories = ref<Category[]>([]);
const jobCategories = ref<Category[]>([]);
const allCategoriesExceptJob = ref<Category[]>([]);

const limit = 20;
const page = ref(1);
const loading = ref(false);

const loadCategories = async () => {
  if (loading.value) return;
  loading.value = true;
  const useCategory = UseCategory();
  let response = await useCategory.fetchCategories(limit, page.value);

  responseCategories.value = response;
  allCategories.value = response;

  // Filter categories to include only the skills owned by the job
  jobCategories.value = response.map((category : Category) => {
    return {
      ...category,
      skills: category.skills.filter(skill => preferences.some(preference => preference.skillId === skill.id))
    };
  });

  // Filter categories to exclude the skills owned by the job
  allCategoriesExceptJob.value = response.map((category : Category) => {
    return {
      ...category,
      skills: category.skills.filter(skill => !preferences.some(preference => preference.skillId === skill.id))
    };
  }).filter((category : Category) => category.skills.length > 0);


  loading.value = false;
};

onMounted(async () => {
  await loadCategories();
});

const openAddSkillModal = (categoryId: number) => {
  addSkills.value = true;
  addskillsCategoryId.value = categoryId;
  skillsAvailable.value = allCategoriesExceptJob.value.find((category) => category.id === categoryId)?.skills || [];

};

const addSkills = ref(false);
const addskillsCategoryId = ref(0);
const skillsAvailable = ref<Skill[]>([]);

const reload = async () => {
  // get job
  await loadCategories();
  console.log('reloaded');
  console.log(currentJob.value);
  // console.log(jobCategories.value);
  // console.log(allCategories.value);
}

const addSkill = async (skill: Skill) => {
  try{


    const skillExists = skills.some((existingSkill: Skill) => existingSkill.id === skill.id);
    if (!skillExists) skills.push(skill)

    let newPreference :Preference = {id:undefined,
      skillId: skill.id,
      isRequired:false,
      weight:0
    };
    const preferenceExists = preferences.some((existingPreference: Preference) => existingPreference.skillId == skill.id)
    if (!preferenceExists) preferences.push(newPreference)
    console.log(currentJob.value);
  }
  catch (e) {
    errorMessage.value = 'Failed to add skill. Please try again.';
    showErrorPopup(errorMessage.value);
  }
  addSkills.value = false;
  await reload();
};

const handleDeleteSkill = async (skillId: number) => {
  if (!confirm('Are you sure you want to delete this skill?')) return;
  try{
    const indexSkill = skills.findIndex(skill => skill.id === skillId);
    const indexPreference = preferences.findIndex(preference  => preference.skillId === skillId );
    if (indexPreference > -1) {
      preferences.splice(indexPreference, 1);
    }
    if(indexSkill > -1){
      skills.splice(indexSkill, 1);
    }

    // currentJob.value.skills = skills;
    // currentJob.value.preferences = preferences;
    console.log(currentJob.value);
  }
  catch (e) {
    errorMessage.value = 'Failed to remove skill. Please try again.';
    showErrorPopup(errorMessage.value);
  }
  await reload();
};

const errorMessage = ref<string | null>(null);

const showPopup = ref(false);
const popupMessage = ref("");

const showSuccessPopup = () => {
  showPopup.value = true;
  popupMessage.value = 'Changes saved!';
}

const showErrorPopup = (message: string) => {
  showPopup.value = true;
  popupMessage.value = message;
}

const togglePopup = () => {
  showPopup.value = !showPopup.value;
};

const close = () => {
  emit('close');
};


</script>

<template>
  <div class="overview-container">
    <UIPopup :button-text="'Close'" :show="showPopup" @close="togglePopup()">{{popupMessage}}</UIPopup>
    <div class="functionality">
      <UIButtonStandard :action="close" :content="'Close'" :color="'red'"/>
      <div class="search-bar-container">
      </div>
      <UISearch :placeholder="'Search...'"/>
    </div>
    <div class="overview">
      <CategoryListItem v-for="category in jobCategories" :key="category.id" :category="category"
                        @openAddSkillModal="openAddSkillModal" @deleteSkill="handleDeleteSkill"/>
    </div>
    <div ref="bottom" class="bottom-marker"></div>
  </div>
  <div class="skill-selection-container" v-if="addSkills">
    <div class="skill-selection">
      <div class="skill-selection-header">
        <h1>Add skills</h1>
        <UIButtonStandard :action="() => addSkills = false" :content="'Close'" :color="'red'"/>
      </div>
      <div class="skills">
        <UIFeature v-for="skill in skillsAvailable" :key="skill.id" :title="skill.name" :onclick="() => addSkill(skill)" class="skill-available">
        </UIFeature>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">


.overview-container {
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  .functionality {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .search-bar-container {
      width: 27.5rem;
      flex-shrink: 1;
    }

    .buttons {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      flex-shrink: 0;
    }
  }

  .overview {
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    height: 25rem;
    width: 100%;
    background: url("../../assets/images/background.jpg") no-repeat center center;
    background-size: cover;
    border-radius: 1rem;
    overflow: auto;
    gap: 1rem;

    &::-webkit-scrollbar {
      width: 12px;
    }

    &::-webkit-scrollbar-track {
      background: var(--white-95);
      border-radius: 1rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--text-primary-color);
      border-radius: 1rem;
      border: 3px solid #f1f1f1;
    }
  }
}

.skill-selection-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.skill-selection-header {
  display: flex;
  width: 100%;
  height: 3rem;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.skill-selection {
  flex-wrap: wrap;
  background-color: var(--white-95);
  padding: 1rem;
  border-radius: 1rem;
  width: 50%;
  min-height: 50%;
}

.skills{

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.skills-to-add-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.skill-available{
  height: fit-content;
  :hover{
    transition: 0.2s;
    background-color: var(--button-primary-color);
    color: var(--white-95);
    border: 1px solid transparent;
  }
}

</style>
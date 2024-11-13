<script setup lang="ts">
import {type Category, UseCategory} from '~/composables/useCategory';
import CategoryListItem from "~/components/UI/CategoryListItem.vue";
import type {flexworker} from "~/composables/useFlexworker";
import type {Skill} from "~/composables/useSkill";

const props = defineProps<{
  flexworker: flexworker;
}>();

const emit = defineEmits(['close']);

const responseCategories = ref<Category[]>([]);
const allCategories = ref<Category[]>([]);
const flexworkerCategories = ref<Category[]>([]);
const allCategoriesExceptFlexworker = ref<Category[]>([]);

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

  // Filter categories to include only the skills owned by the flexworker
  flexworkerCategories.value = response.map((category) => {
    return {
      ...category,
      skills: category.skills.filter(skill => props.flexworker.skills.some(flexSkill => flexSkill.id === skill.id))
    };
  });

  // Filter categories to exclude the skills owned by the flexworker
  allCategoriesExceptFlexworker.value = response.map((category) => {
    return {
      ...category,
      skills: category.skills.filter(skill => !props.flexworker.skills.some(flexSkill => flexSkill.id === skill.id))
    };
  }).filter(category => category.skills.length > 0);


  page.value++;
  loading.value = false;
};

onMounted(async () => {
  await loadCategories();
});

const openAddSkillModal = (categoryId: number) => {
  addSkills.value = true;
  addskillsCategoryId.value = categoryId;
  skillsAvailable.value = allCategoriesExceptFlexworker.value.find((category) => category.id === categoryId)?.skills || [];

};

const addSkills = ref(false);
const addskillsCategoryId = ref(0);
const skillsAvailable = ref<Skill[]>([]);

const skillsToAdd = ref<Skill[]>([]);

const addSkill = (skill: Skill) => {
  skillsToAdd.value.push(skill);

  // remove the skill from the allcategories except flexworker list
  allCategoriesExceptFlexworker.value = allCategoriesExceptFlexworker.value.map((category) => {
    if (category.id === addskillsCategoryId.value) {
      return {
        ...category,
        skills: category.skills.filter((s) => s.id !== skill.id)
      };
    }
    return category;
  });

  // add the skill to the flexworker categories list
  flexworkerCategories.value = flexworkerCategories.value.map((category) => {
    if (category.id === addskillsCategoryId.value) {
      return {
        ...category,
        skills: [...category.skills, skill]
      };
    }
    return category;
  });
  addSkills.value = false;
};

const deselectSkill = (skill: Skill) => {
  skillsToAdd.value = skillsToAdd.value.filter((s) => s.id !== skill.id);
  allCategoriesExceptFlexworker.value = allCategoriesExceptFlexworker.value.map((category) => {
    if (category.id === addskillsCategoryId.value) {
      return {
        ...category,
        skills: [...category.skills, skill]
      };
    }
    return category;
  });

  flexworkerCategories.value = flexworkerCategories.value.map((category) => {
    if (category.id === addskillsCategoryId.value) {
      return {
        ...category,
        skills: category.skills.filter((s) => s.id !== skill.id)
      };
    }
    return category;
  });
};

const errorMessage = ref<string | null>(null);

const saveSkills = async () => {
  const useFlexworker = UseFlexworker();
  try {
    console.log("Adding skills");
    await useFlexworker.addSkillsToFlexworker(props.flexworker.id, skillsToAdd.value.map(skill => skill.id));
    console.log("Skills added");
    skillsToAdd.value = [];
    console.log("Skills added");
    emit('close');
  }
  catch (e) {
    errorMessage.value = 'Failed to add skills. Please try again.';
    showErrorPopup(errorMessage.value);
  }
};

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
      <CategoryListItem v-for="category in flexworkerCategories" :category="category"
                        @openAddSkillModal="openAddSkillModal"/>
    </div>
    <div ref="bottom" class="bottom-marker"></div>
  </div>
  <div class="skill-selection-container" v-if="addSkills">
    <div class="skill-selection">
      <div class="skill-selection-header">
        <h1>Add skills</h1>
        <UIButtonStandard :action="() => addSkills = false" :content="'Close'" :color="'red'"/>
      </div>
      <UIFeature v-for="skill in skillsAvailable" :key="skill.id" :title="skill.name">
        <UIButtonStandard :action="() => addSkill(skill)" :content="'Add'"/>
      </UIFeature>
    </div>
  </div>
    <UIButtonStandard :action="saveSkills" :content="'Save'" v-if="skillsToAdd.length > 0"/>
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
}

.skill-selection {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  background-color: var(--white-95);
  padding: 1rem;
  border-radius: 1rem;
  width: 50%;
  height: 50%;
}

.skills-to-add-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

</style>
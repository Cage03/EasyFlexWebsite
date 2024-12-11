<template>
  <div class="category-overview-page">
    <div class="overview-container">
      <UIPopup
          :button-text="'Confirm'"
          @close="createCategory"
          :show="popupState.createCategory"
          :x-button="true"
          @xButtonFunction="togglePopup('createCategory')"
      >
        <UIInputField v-model="categoryNameInput" placeholder="Name" />
      </UIPopup>
      <UIPopup
          :button-text="'Confirm'"
          @close="addSkill"
          :show="popupState.addSkill"
          :x-button="true"
          @xButtonFunction="togglePopup('addSkill')"
      >
        <UIInputField v-model="skillNameInput" placeholder="Name" />
      </UIPopup>
      <UIPopup
          :button-text="'Close'"
          @close="togglePopup('misc')"
          :show="popupState.misc"
      >
        {{ miscPopupMessage }}
      </UIPopup>

      <UIEditDeletePopUp
          :x-button="true"
          v-if="selectedCategory"
          :name="selectedCategory.name"
          :id="selectedCategory.id"
          :show="popupState.editCategory"
          @close="togglePopup('editCategory')"
          @delete="deleteCategory"
          @update="updateCategory"
      />

      <UIEditDeletePopUp
          :x-button="true"
          v-if="selectedSkill"
          :name="selectedSkill.name"
          :id="selectedSkill.id"
          :show="popupState.editSkill"
          @close="togglePopup('editSkill')"
          @delete="deleteSkill"
          @update="updateSkill"
          />
      <h1>Category and Skill Manager</h1>
      <div class="functionality">
        <div class="search-bar-container">
          <UISearch v-model="searchQuery" placeholder="Search..." />
        </div>
        <div class="buttons">
          <UIButtonStandard
              :action="() => togglePopup('createCategory')"
              :content="'Add Category'"
          />
        </div>
      </div>
      <div class="overview">
        <UICategoryListItem
            v-for="category in categories"
            :key="category.id"
            :category="category"
            :action="() => selectCategoryForEditing(category)"
            @openAddSkillModal="openAddSkillModal"
            @deleteSkill="openUpdateSkillModal"
        />
        <div ref="bottom" class="bottom-marker"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UseCategory } from "~/composables/useCategory";
import type { Category } from "~/composables/useCategory";
import type {Skill} from "~/composables/useSkill";

const useCategory = UseCategory();
const useSkill = UseSkill();

const skillNameInput = ref("");

const categories = ref<Category[]>([]);
const selectedCategory = ref<Category | null>(null);
const selectedSkill = ref<Skill | null>(null);

const popupState = reactive({
  createCategory: false,
  editCategory: false,
  misc: false,
  editSkill: false,
  addSkill: false,
});

const miscPopupMessage = ref("");

const skillToAddCategoryId = ref(0);
const categoryNameInput = ref("");
const searchQuery = ref("");

const page = ref(1);
const limit = 10;
const isLoading = ref(false);
const canFetchMore = ref(true);

const togglePopup = (popupKey: keyof typeof popupState) => {
  popupState[popupKey] = !popupState[popupKey];
};

const showPopupMessage = (message: string) => {
  miscPopupMessage.value = message;
  popupState.misc = true;
};

const loadMoreCategories = async () => {
  if (isLoading.value || !canFetchMore.value) return;

  isLoading.value = true;
  try {
    const newCategories = await useCategory.fetchCategories(limit, page.value);
    if (newCategories.length) {
      categories.value.push(...newCategories);
      page.value++;
    } else {
      canFetchMore.value = false;
    }
  } catch (error: any) {
    console.error("Error loading categories:", error);
    showPopupMessage("Failed to load categories.");
    canFetchMore.value = false;
  } finally {
    isLoading.value = false;
  }
};

const updateCategory = async ( id: number, name: string ) => {
  if (!name.trim()) {
    showPopupMessage("Category name cannot be empty.");
    return;
  }

  try {
    await useCategory.updateCategory(id, name);
    // reload
    categories.value = [];
    page.value = 1;
    canFetchMore.value = true;
    await loadMoreCategories();
    showPopupMessage("Category updated successfully.");
    togglePopup("editCategory");
  } catch (error: any) {
    showPopupMessage(error.data?.message || "Failed to update category.");
  }
};

const deleteCategory = async (id: number) => {
  const confirmed = confirm("Are you sure you want to delete this category?");
  if (!confirmed) return;

  try {
    await useCategory.deleteCategory(id);
    categories.value = categories.value.filter((category) => category.id !== +id);
    showPopupMessage("Category deleted successfully.");
    togglePopup("editCategory");
  } catch (error: any) {
    showPopupMessage(error.data?.message || "Failed to delete category.");
  }
};

const createCategory = async () => {
  if (!categoryNameInput.value.trim()) {
    showPopupMessage("Category name cannot be empty.");
    return;
  }

  try {
    const newCategory = await useCategory.createCategory(categoryNameInput.value);
    categories.value.unshift(newCategory);
    showPopupMessage("Category added successfully.");
    togglePopup("createCategory");
  } catch (error: any) {
    showPopupMessage(error.data?.message || "Failed to add category.");
  }
};

const openUpdateSkillModal = async (skillId : number) => {
  selectedSkill.value = await useSkill.fetchSkill(skillId);
  togglePopup("editSkill");
};

const openAddSkillModal = (categoryId: number) => {
  skillNameInput.value = "";
  skillToAddCategoryId.value = categoryId;
  togglePopup("addSkill");
};

const addSkill = async () => {
  if (!skillNameInput.value.trim()) {
    showPopupMessage("Skill name cannot be empty.");
    return;
  }
  try {
    let skill : Skill = {
      id: 0,
      name: skillNameInput.value,
      categoryId: skillToAddCategoryId.value,
    };
    await useSkill.createSkill(skill);
    // reload the page
    categories.value = [];
    page.value = 1;
    canFetchMore.value = true;
    await loadMoreCategories();
    showPopupMessage("Skill added successfully.");
    togglePopup("addSkill");
  } catch (error: any) {
    showPopupMessage(error.data?.message || "Failed to add skill.");
  }
};

const updateSkill = async (skillId: number, name: string) => {
  if (!name.trim()) {
    showPopupMessage("Skill name cannot be empty.");
    return;
  }

  try {
    let skill : Skill = await useSkill.fetchSkill(skillId);
    skill.name = name;
    await useSkill.updateSkill(skill);
    categories.value = [];
    page.value = 1;
    canFetchMore.value = true;
    await loadMoreCategories();
    showPopupMessage("Skill updated successfully.");
    togglePopup("editSkill");
  } catch (error: any) {
    showPopupMessage(error.data?.message || "Failed to update skill.");
  }
};

const deleteSkill = async (skillId: number) => {
  const confirmed = confirm("Are you sure you want to delete this skill?");
  if (!confirmed) return;

  try {
    await useSkill.deleteSkill(skillId);
    categories.value.forEach((category) => {
      category.skills = category.skills.filter((skill) => skill.id !== skillId);
    });
    showPopupMessage("Skill deleted successfully.");
    togglePopup("editSkill");
  } catch (error: any) {
    showPopupMessage(error.data?.message || "Failed to delete skill.");
  }
};

const selectCategoryForEditing = (category: Category) => {
  selectedCategory.value = category;
  togglePopup("editCategory");
};

onMounted(async () => {
  await loadMoreCategories();
  const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting) await loadMoreCategories();
  }, { root: null, rootMargin: "0px", threshold: 1.0 });

  const bottomMarker = document.querySelector(".bottom-marker");
  if (bottomMarker) observer.observe(bottomMarker);
});
</script>

<style scoped lang="scss">
.category-overview-page {
  height: calc(100% - 1rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: var(--padding-standard);

  .overview-container {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-medium);

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
        gap: var(--spacing-standard);
        flex-shrink: 0;
      }
    }

    .overview {
      padding: var(--padding-large) var(--padding-standard);
      display: flex;
      flex-direction: column;
      height: 25rem;
      width: 100%;
      background: url("../../assets/images/background.jpg") no-repeat center center;
      background-size: cover;
      border-radius: var(--border-radius-standard);
      overflow: auto;
      gap: var(--spacing-standard);

      &::-webkit-scrollbar {
        width: 12px;
      }

      &::-webkit-scrollbar-track {
        background: var(--white-95);
        border-radius: var(--border-radius-standard);
      }

      &::-webkit-scrollbar-thumb {
        background-color: var(--text-primary-color);
        border-radius: var(--border-radius-standard);
        border: 3px solid #f1f1f1;
      }
    }
  }
}
</style>

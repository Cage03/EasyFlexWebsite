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
          :button-text="'Close'"
          @close="togglePopup('misc')"
          :show="popupState.misc"
      >
        {{ miscPopupMessage }}
      </UIPopup>
      <UICategoryEditPopUp
          v-if="selectedCategory"
          :category="selectedCategory as any"
          :show="popupState.editCategory"
          @close="togglePopup('editCategory')"
          @updateCategory="updateCategory"
          @deleteCategory="deleteCategory"
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
        />
        <div ref="bottom" class="bottom-marker"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UseCategory } from "~/composables/useCategory";
import type { Category } from "~/composables/useCategory";

const useCategory = UseCategory();

const categories = ref<Category[]>([]);
const selectedCategory = ref<Category | null>(null);

const popupState = reactive({
  createCategory: false,
  editCategory: false,
  misc: false,
});

const miscPopupMessage = ref("");

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

const updateCategory = async (updatedCategory: { id: string; name: string }) => {
  if (!updatedCategory.name.trim()) {
    showPopupMessage("Category name cannot be empty.");
    return;
  }

  try {
    await useCategory.updateCategory(updatedCategory);
    const category = categories.value.find((cat) => cat.id === +updatedCategory.id);
    if (category) category.name = updatedCategory.name;
    showPopupMessage("Category updated successfully.");
    togglePopup("editCategory");
  } catch (error: any) {
    showPopupMessage(error.data?.message || "Failed to update category.");
  }
};

const deleteCategory = async (id: string) => {
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
  padding-top: 1rem;

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
}
</style>

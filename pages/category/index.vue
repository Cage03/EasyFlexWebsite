<template>
<div class="category-overview-page">
  <div class="overview-container">
    <UIPopup :button-text="'Confirm'" @close="createCategory"  @xButtonFunction="toggleCreateCategoryPopup" :x-button="true" :show="creatCategoryPopupTrigger">
      <UIInputField v-model="categoryCreateModelName" placeholder="Name" style="font-size: 1.5rem" />
    </UIPopup>

    <h1>Category and skill manager</h1>
    <div class="functionality">
      <div class="search-bar-container">
        <UISearch :placeholder="'Search...'" v-model="searchQuery"/>
      </div>
      <div class="buttons">
        <UIButtonStandard :action="toggleCreateCategoryPopup"  :content="'add category'"></UIButtonStandard>
      </div>
    </div>
    <div class="overview">
      <template v-for="Category in categories" :key="Category.id">
        <UICategoryListItem :category="Category"></UICategoryListItem>
      </template>
      <div ref="bottom" class="bottom-marker"></div>
    </div>
  </div>
</div>
</template>
<script setup lang="ts">
import {IconType} from "~/types/global-types";
import {UseCategory} from "~/composables/useCategory";
const useCategory = UseCategory();

interface CategoryInterface {
  id: string,
  name: string,
  skills:{
    id: string,
    name: string,
  }[]
}
const creatCategoryPopupTrigger = ref(false);
const categoryCreateModelName = ref('')
let categories = ref<CategoryInterface[]>([])
const page = ref(1);
const limit = 10;
const loading = ref(false);

const searchQuery = ref('') ///currently does nothing
// const popUpSelect = ref({
//   createCategory: false,
// });
// function popUpSelector(popUpName: keyof typeof popUpSelect.value){
//   if (popUpName in popUpSelect.value) {
//     popUpSelect.value[popUpName] = !popUpSelect.value[popUpName];
//     console.warn(`Property ${popUpName} trigger`);
//   } else {
//     console.warn(`Property ${popUpName} does not exist in popUpSelect`);
//   }
// };


const toggleCreateCategoryPopup =()=>{
  creatCategoryPopupTrigger.value = !creatCategoryPopupTrigger.value;
}
const createCategory = async () =>{
  const confirmed = window.confirm("Are you sure you want to add a new category?");
  if (confirmed) {
    try {
      console.log("calling create");
      await useCategory.createCategory(categoryCreateModelName.value);
      console.log('category created successfully!');
      toggleCreateCategoryPopup()

    } catch (err: any) {
      console.log(err);

    }
  }
}

const loadMoreCategories = async () => {
  if (loading.value) return;
  loading.value = true;

  try {
    const newCategories = await useCategory.fecthCategories(page.value, limit);
    if (newCategories.length) {
      categories.value.push(...newCategories);
      page.value++;
      console.log(categories.value);
    }
  } catch (error) {
    // popupMessage.value = "Error occured while trying to get jobs";
    // showPopup.value = true;
  } finally {
    loading.value = false;
  }
}

onMounted(async () =>
{
  await loadMoreCategories();

  const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting) {
      await loadMoreCategories();
    }
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  });
  const bottomMarker = document.querySelector('.bottom-marker');
  if (bottomMarker) {
    observer.observe(bottomMarker);
  }
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
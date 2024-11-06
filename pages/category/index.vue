<script setup lang="ts">
import {IconType} from "~/types/global-types";
import {UseCategory} from "~/composables/useCategory";
const useCategory = UseCategory();
interface category {
  id: string,
  name: string,
}

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

const creatCategoryPopupTrigger = ref(false);
const toggleCreateCategoryPopup =()=>{
  creatCategoryPopupTrigger.value = !creatCategoryPopupTrigger.value;
}

const categoryCreateModelName = ref('')

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
</script>

<template>
<div class="register_page">
  <div class="window">
    <UIPopup :button-text="'Confirm'" @close="createCategory"  @xButtonFunction="toggleCreateCategoryPopup" :x-button="true" :show="creatCategoryPopupTrigger">
      <div>
        <h1>Add new category</h1>
        <UIInputField v-model="categoryCreateModelName" placeholder="Name" style="font-size: 1.5rem" />
      </div>
    </UIPopup>
    <h1>Category and skill manager</h1>
    <div class="profile_data">
      <UIButtonStandard :action="toggleCreateCategoryPopup"  :content="'add category'"></UIButtonStandard>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.register_page {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .window {
    display: flex;
    width: 50rem;
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;

    border-radius: 1rem;
    background: var(--white-95, rgba(250, 250, 250, 0.95));

    /* Shadow 4 Sides */
    box-shadow: 0px 0px 20px 0px rgba(63, 43, 79, 0.08);
  }
}
</style>
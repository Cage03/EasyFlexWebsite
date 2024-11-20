<template>
<div class="category-overview-page">
  <div class="overview-container">
    <UIPopup :button-text="'Confirm'" @close="createCategory"  @xButtonFunction="toggleCreateCategoryPopup" :x-button="true" :show="creatCategoryPopupTrigger">
      <UIInputField v-model="categoryCreateModelName" placeholder="Name" style="font-size: 1.5rem" />
    </UIPopup>
    <UICategoryEditPopUp :category="{id:selectedCategory.id, name:selectedCategory.name}" :show="categoryEditPopupTrigger"
                         @close="toggleEditPopupTrigger" @deleteCategory="deleteCategory"  @updateCategory="updateCategory" />
    <UIPopup :button-text="'Close'" :show="showMiscPopup" @close="toggleMiscPopup()">{{ miscPopupMessage }}</UIPopup>
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
        <UICategoryListItem  :category="Category" :action="() => showEditPopUp(Category)"></UICategoryListItem>
      </template>
      <div ref="bottom" class="bottom-marker"></div>
    </div>
  </div>
</div>
</template>
<script setup lang="ts">
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
const categoryEditPopupTrigger = ref(false);
const categoryCreateModelName = ref('')
let categories = ref<CategoryInterface[]>([])
let selectedCategory = ref<CategoryInterface>({id:'',name:'',skills:[]})
const page = ref(1);
const limit = 10;
const loading = ref(false);

const showMiscPopup = ref(false)
const miscPopupMessage = ref("")
const canFetchAgain = ref(true)

const searchQuery = ref('') ///currently does nothing

function showSuccessPopup( message: string ) {
  toggleMiscPopup()
  miscPopupMessage.value = message;
}

function showErrorPopup(message: string) {
  toggleMiscPopup()
  miscPopupMessage.value = 'Something went wrong! \n' + message;
}
const showEditPopUp = (category: CategoryInterface) => {

  selectedCategory.value.id = category.id;
  selectedCategory.value.name = category.name;
  toggleEditPopupTrigger()
}
const toggleEditPopupTrigger = () =>{
  categoryEditPopupTrigger.value = !categoryEditPopupTrigger.value
}
const setSelected = (id:string, name:string) =>{
  selectedCategory.value.id = id
  selectedCategory.value.name = name
}
const toggleMiscPopup = () => {
  showMiscPopup.value = !showMiscPopup.value;
}
const toggleCreateCategoryPopup =()=>{
  creatCategoryPopupTrigger.value = !creatCategoryPopupTrigger.value;
}

const checkIfSameOrExist = (category:{id:string, name:string}) =>{
  let nameAlreadyExists = categories.value.some(x => x.name === category.name && x.id !== category.id)
  let Message = ref('')
  let isTrue = ref(false);
  if(nameAlreadyExists){
    Message.value = "A category with this name already exists";
    isTrue.value =true
  }
  else if(category.name.toLowerCase() === selectedCategory.value.name.toLowerCase() && category.name === selectedCategory.value.name){
    Message.value = "The name of the category is still the same";
    isTrue.value = true
  }
  return {message: Message.value, isTrue: isTrue.value};
}
const updateCategory = async (category:{id:string, name:string}) =>{
  const confirmed = window.confirm("Are you sure you want to update this category?");
  const categoryToUpdate = categories.value.find(x => x.id === category.id);
  if (confirmed) {
    let result = checkIfSameOrExist(category);
    if(result.isTrue){
      showErrorPopup(result.message)
      if (categoryToUpdate) {
        setSelected(categoryToUpdate.id, categoryToUpdate.name)
      }
    }
    else{
      try{
        const response = await useCategory.updateCategory(category)
        if(response.ok){
          toggleEditPopupTrigger();
          if (category) {
            if (categoryToUpdate) {
              categoryToUpdate.name = category.name;
            }
          }

          showSuccessPopup("Successfully updated the category!")
        }
      }
      catch (err :any ) {
        if (err.response._data.alreadyExists) {
          showErrorPopup("A category with this name already exists");
        }
        else if(err.response._data.doesNotExist){
          showErrorPopup("the category you are modifying doesn't exist");
        }
        else if(err.response._data.isSameName){
          showErrorPopup("The name of the category is still the same");
        }
        else{
          showErrorPopup("Failed to create a new category.");
        }
      }
      finally {
        if (categoryToUpdate) {
          setSelected(categoryToUpdate.id, categoryToUpdate.name)
        }
      }
    }
  }
}

const createCategory = async () =>{
  const confirmed = window.confirm("Are you sure you want to add a new category?");
  if (confirmed) {
    try{
      const response = await useCategory.createCategory(categoryCreateModelName.value)
      if(response.ok){
        toggleCreateCategoryPopup();
        showSuccessPopup("Successfully added a new Category!")
      }
    }
    catch (err :any ) {
        if (err.response._data.isDuplicate) {
          showErrorPopup("This category already exists.");
        } else{
          showErrorPopup("Failed to create a new category.");
        }
    }
  }
}

const deleteCategory = async (id:string) =>{
  console.log("Attempted delete of ID: " + id);
  const confirmed = window.confirm("Are you sure you want to delete this category?");
  if (confirmed) {
    try{
      const response = await useCategory.deleteCategory(id)
      if(response.ok){
        toggleEditPopupTrigger();
        showSuccessPopup("Successfully removed the category!")
      }
    }
    catch (err :any ) {
        showErrorPopup("Failed to delete this category.");
    }
  }
}

const loadMoreCategories = async () => {
  if (loading.value) return;

  loading.value = true;

  try {
    const newCategories = await useCategory.fetchCategories(limit,page.value );
    if (newCategories.length) {
      categories.value.push(...newCategories);
      page.value++;
    }
  } catch (error) {
    canFetchAgain.value = false;
    showErrorPopup("Failed to load categories, comeback later");

  } finally {
    loading.value = false;
  }
}


onMounted(async () =>
{
  await loadMoreCategories();

  const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting && canFetchAgain.value ) {
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
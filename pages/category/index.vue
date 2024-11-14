<template>
<div class="category-overview-page">
  <div class="overview-container">
    <UIPopup :button-text="'Confirm'" @close="createCategory"  @xButtonFunction="toggleCreateCategoryPopup" :x-button="true" :show="creatCategoryPopupTrigger">
      <UIInputField v-model="categoryCreateModelName" placeholder="Name" style="font-size: 1.5rem" />
    </UIPopup>
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
        <UICategoryListItem :category="Category" @deleteSkill="deleteSkill"></UICategoryListItem>
      </template>
      <div ref="bottom" class="bottom-marker"></div>
    </div>
  </div>
</div>
</template>
<script setup lang="ts">
const useCategory = UseCategory();
const useSkill = UseSkill();

const creatCategoryPopupTrigger = ref(false);
const categoryCreateModelName = ref('')
let categories = ref<Category[]>([])
const page = ref(1);
const limit = 10;
const loading = ref(false);

const showMiscPopup = ref(false)
const miscPopupMessage = ref("")
const canFetchAgain = ref(true)

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
function showSuccessPopup( message: string ) {
  toggleMiscPopup()
  miscPopupMessage.value = message;
}

function showErrorPopup(message: string) {
  toggleMiscPopup()
  miscPopupMessage.value = 'Something went wrong! \n' + message;
}

const toggleMiscPopup = () => {
  showMiscPopup.value = !showMiscPopup.value;
}
const toggleCreateCategoryPopup =()=>{
  creatCategoryPopupTrigger.value = !creatCategoryPopupTrigger.value;
}
const createCategory = async () =>{
  const confirmed = window.confirm("Are you sure you want to add a new category?");
  if (confirmed) {
    try {
      await useCategory.createCategory(categoryCreateModelName.value)
          .then(response =>{
            if(response.ok){
              toggleCreateCategoryPopup();
            }
          })
    } catch (err: any) {
      if (err.response._data.isDuplicate) {
        showErrorPopup("This category already exists.");
      } else{
        showErrorPopup("Failed to create a new category.");
      }
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
      console.log(categories.value);
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
      console.log("Observer canFetchCheck :" + canFetchAgain.value)
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

const deleteSkill = async (skillId: number) => {
  const confirmed = window.confirm("Are you sure you want to delete this skill?");
  if (confirmed) {
    try {
      await useSkill.deleteSkill(skillId);
      categories.value = categories.value.map(category => {
        category.skills = category.skills.filter(skill => skill.id !== skillId);
        return category;
      });
    } catch (err: any) {
      showErrorPopup("Failed to delete skill");
    }
  }
}

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
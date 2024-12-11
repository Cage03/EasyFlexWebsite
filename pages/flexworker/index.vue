<template>
  <UIPopup :button-text="'Close'" :show="showPopup" @close="togglePopup()">{{ popupMessage }}</UIPopup>
  <div class="flexworker-overview-page">
    <div class="overview-container">
      <div class="functionality">
        <div class="search-bar-container">
          <UISearch :placeholder="'Search...'" v-model="computedSearchQuery" />
        </div>
        <div class="buttons">
          <UIButtonStandard :action="redirectToCreate" :icon="IconType.Plus" :content="'Create New'" />
        </div>
      </div>
      <div class="overview">
        <template v-for="flexworker in data" :key="flexworker.id">
          <UIListitem
              :properties="formatFlexworkerProperties(flexworker)"
              :redirect="`/flexworker/get?id=${flexworker.id}`"
          />
        </template>
        <div ref="bottom" class="bottom-marker"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UseFlexworker } from "~/composables/useFlexworker";
import { IconType } from "~/types/global-types";

const {
  data,
  fetchFlexworkers,
  computedSearchQuery,
  clearFlexworkers,
  formatFlexworkerProperties,
} = UseFlexworker();

const showPopup = ref(false);
const popupMessage = ref("");

const togglePopup = () => {
  showPopup.value = !showPopup.value;
};

const redirectToCreate = () => {
  const router = useRouter();
  router.push("/flexworker/register");
};

onMounted(async () => {
  await fetchFlexworkers();

  const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting) {
      await fetchFlexworkers();
    }
  }, {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });

  const bottomMarker = document.querySelector(".bottom-marker");
  if (bottomMarker) {
    observer.observe(bottomMarker);
  }
});
</script>

<style scoped lang="scss">
.flexworker-overview-page {
  height: calc(100% - 1rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
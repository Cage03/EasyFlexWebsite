<template>
  <div class="job-overview-page">
    <div class="overview-container">
      <div class="functionality">
        <div class="search-bar-container">
          <UISearch :placeholder="'Search...'" v-model="searchQuery"/>
        </div>
        <div class="buttons">
          <UIButtonStandard :action="redirectToCreate" :icon="IconType.Plus" :content="'Create New'"/>
        </div>
      </div>
      <div class="overview">
        <template v-for="job in jobs">
          <UIListitem :properties="formatJobProperties(job)" :redirect="`/job?id=${job.id}`"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {IconType} from "~/types/global-types";

let jobs = ref([])

const formatJobProperties = (job: Record<string, any>) => {
  return Object.entries(job)
      .filter(([key]) => key !== 'id')
      .map(([key, value]) => ({key, value}));
}

const searchQuery = ref("");

const redirectToCreate = () => {
  const router = useRouter();
  
  router.push('/') //todo find right page to redirect to
}

</script>

<style scoped lang="scss">
.job-overview-page {
  height: 100%;
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
      height: 42rem;
      width: 100%;
      background: url("../../assets/images/background.jpg") no-repeat center center;
      background-size: cover;
      border-radius: 1rem;
      overflow: auto;
      gap: 1rem;
    }
  }
}
</style>
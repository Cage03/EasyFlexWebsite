<template>
  <div class="flexworker-overview-page">
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
        <template v-for="flexworker in flexworkers">
          <UIListitem :properties="formatFlexworkerProperties(flexworker)" :redirect="`/flexworker/name?id=${flexworker.id}`"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {IconType} from "~/types/global-types";

interface Flexworker{
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

const flexworkers = ref<Flexworker[]>([])

const formatFlexworkerProperties = (flexworker: Record<string, any>) => {
  return Object.entries(flexworker)
      .filter(([key]) => key !== 'id')
      .map(([key, value]) => ({key, value}));
}

const searchQuery = ref("");

const redirectToCreate = () => {
  const router = useRouter();

  router.push('/') //todo find right page to redirect to
}

const api = useRuntimeConfig().public.apiUrl;
const error = ref(null);

onMounted(async () => {
  try {
    const res = await fetch(`${api}/Flexworker/Get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();

    // only get id, name, email, phoneNumber
    flexworkers.value = data.map((flexworker: Record<string, any>) => ({
      id: flexworker.id,
      name: flexworker.name,
      email: flexworker.email,
      phoneNumber: flexworker.phoneNumber
    }));
  } catch (err:any) {
    error.value = err.message;
    console.error('Fetch error:', err);
  }
});

</script>

<style scoped lang="scss">
.flexworker-overview-page {
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
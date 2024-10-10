<template>
  <UIPopup :button-text="'Close'" :show="showPopup" @close="togglePopup()">{{popupMessage}}</UIPopup>
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
          <UIListitem :properties="formatFlexworkerProperties(flexworker)"
                      :redirect="`/flexworker/name?id=${flexworker.id}`"/>
        </template>
        <div ref="bottom" class="bottom-marker"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {IconType} from "~/types/global-types";

const showPopup = ref(false);
const popupMessage = ref("");

const togglePopup = () => {
  showPopup.value = !showPopup.value;
}

const showErrorPopup = (message: string) => {
  popupMessage.value = "Failure to load flexworkers";
  showPopup.value = true;
}

interface Flexworker {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

const flexworkers = ref<Flexworker[]>([])
const page = ref(0);
const limit = 10;
const loading = ref(false);

const formatFlexworkerProperties = (flexworker: Record<string, any>) => {
  return Object.entries(flexworker)
      .filter(([key]) => key !== 'id')
      .map(([key, value]) => ({key, value}));
}

const searchQuery = ref("");

const redirectToCreate = () => {
  const router = useRouter();

  router.push('/flexworker/register') //todo find right page to redirect to
}

const api = useRuntimeConfig().public.apiUrl;
const error = ref(null);

const fetchFlexworkers = async () => {
  if (loading.value) return;
  loading.value = true;
  try {
    const res = await fetch(`${api}/Flexworker/Get?limit=${limit}&page=${page.value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    let data = await res.json();
    data = data.map((flexworker: Flexworker) => ({
      id: flexworker.id,
      name: flexworker.name,
      email: flexworker.email,
      phoneNumber: flexworker.phoneNumber,
    }));
    flexworkers.value.push(...data);
    page.value++;
  } catch (err: any) {
    error.value = err.message;
    console.error('Fetch error:', err);
    showErrorPopup(err.message);
  } finally {
    loading.value = false;
  }
};


onMounted(async () => {
  await fetchFlexworkers();

  const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting) {
      await fetchFlexworkers();
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
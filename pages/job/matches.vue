<script setup lang="ts">
import { UseAlgorithm, type compatibleFlexworker } from '~/composables/useAlgorithm';

const router = useRouter();
const useAlgorithm = UseAlgorithm();

const jobId = ref<number>(0);

const isLoading = ref(false);
const percentage = ref(0);
const step = ref(0);
const content = Array(10).fill(null);

const fetchFlexworkers = async () => {
  isLoading.value = true;
  await useAlgorithm.fetchFlexworkers(jobId.value);
  isLoading.value = false;
};

const roundedResults = computed(() => {
  return useAlgorithm.flexworkers.value.map(flexworker => ({
    ...flexworker,
    compatibility: Math.round(flexworker.compatibility)
  }));
});

onMounted(async () => {
  jobId.value = parseInt(router.currentRoute.value.query.id as string);
  console.log(jobId.value);
  await fetchFlexworkers();

  /*
  const totalDuration = 10000;
  const intervalDuration = 50; 
  const steps = totalDuration / intervalDuration; 
  const increment = 100 / steps; 

  const interval = setInterval(() => {
    percentage.value += increment;

    if (percentage.value >= 100) {
      percentage.value = 100;
      clearInterval(interval);
    }
    
    if (step.value < content.length && percentage.value >= (step.value * 100 / content.length)) {
      step.value += 1;
    }
  }, intervalDuration);
  */
  
});

let pageData = {
  job: {
    title: 'Software Developer'
  },
}

watch(percentage, (newVal) => {
  document.documentElement.style.setProperty('--loading-progress', `${newVal}%`);
});


</script>

<template>
  <div v-if="!isLoading" class="matching-page">
    <h2>Matches for "{{ pageData.job.title }}"</h2>
    <div class="matches">
      <div class="match" v-for="flexworker in roundedResults" :key="flexworker.id">
        <div class="profile-picture-orb">
          <img :src="flexworker.profilePictureUrl" alt="Profile picture">
          <h1 class="compatibility">{{ flexworker.compatibility }}%</h1>
        </div>
        <h1>{{ flexworker.name }}</h1>
      </div>
    </div>
  </div>
  <div v-if="isLoading" class="loading-screen">
    <div class="loading-bar">
      <div class="background">
        <h1 :style="{ '--loading-progress': percentage + '%' }">Finding the perfect "{{ pageData.job.title }}"</h1>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.matching-page {
  height: calc(100% - 1rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem;
  gap: 1rem;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0;
  }

  h2 {
    align-self: flex-start;
    font-size: 2.5rem;
    margin-left: 3rem;
  }

  .matches {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 4rem 0.5rem;
    padding: 3rem;

    .match {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      height: 18rem;
      width: 14rem;
      gap: 0.5rem;
      background-color: #fff;
      border-radius: 1rem;
      box-shadow: var(--shadow-four-sides);
      padding: 1rem;
      
      &:first-child {
        .profile-picture-orb{
          border-color:#4E8798;
        }
      }

      .profile-picture-orb {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        align-self: center;
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        overflow: hidden;
        border: 4px solid black;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .compatibility {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2.5rem;
          font-weight: bold;
          background-color: rgba(255, 255, 255, 0.5);
          color: var(--text-primary-color);
        }
      }

      h1 {
        font-size: 2.5rem;
        font-weight: bold;
      }
    }
  }
}

.loading-screen {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .loading-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .background {
      display: inline-block;
      position: relative;
      overflow: hidden;
      background-color: var(--text-primary-color);
      background-clip: text;
      color: transparent;
      font-size: 2.5rem;

      h1 {
        font-size: 2.5rem;
        font-weight: bold;
        white-space: nowrap;
        background: linear-gradient(
                70deg,
                #4E8798 var(--loading-progress),
                transparent 1%
        );
        background-size: calc(var(--loading-progress) * 1%);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        transition: background-size 0.5s ease;
      }
    }
  }
}
</style>
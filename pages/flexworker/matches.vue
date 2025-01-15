<script setup lang="ts">

import { type Flexworker } from '~/composables/useFlexworker';
import { type compatibleJob } from '~/composables/useAlgorithm';

const router = useRouter();
const useAlgorithm = UseAlgorithm();
const useFlexworker = UseFlexworker();

const flexworker = ref<Flexworker>({
  id: 0,
  name: '',
  address: '',
  dateOfBirth: '',
  email: '',
  phoneNumber: '',
  profilePictureUrl: '',
  skills: []
});

const compatibleJobs = ref<compatibleJob[]>([]);

const isLoading = ref(false);
const percentage = ref(0);
const step = ref(0);
const content = Array(10).fill(null);

const fetchJobs = async (id: number) => {
  isLoading.value = true;
  if (flexworker.value.id !== null) {
    compatibleJobs.value = await useAlgorithm.fetchJobs(id);
  }
  isLoading.value = false;
};

onMounted(async () => {
  flexworker.value = await useFlexworker.fetchFlexworkerById(parseInt(router.currentRoute.value.query.id as string));
  await fetchJobs(flexworker.value.id!);
  console.log(compatibleJobs.value);
  
  const totalDuration = 3000;
  const intervalDuration = 50; 
  const steps = totalDuration / intervalDuration; 
  const increment = 100 / steps; 

  const interval = setInterval(() => {
    percentage.value += increment;

    if (percentage.value >= 100) {
      percentage.value = 100;
      isLoading.value = false;
      clearInterval(interval);
    }
    
    if (step.value < content.length && percentage.value >= (step.value * 100 / content.length)) {
      step.value += 1;
    }
  }, intervalDuration);
  
});

watch(percentage, (newVal) => {
  document.documentElement.style.setProperty('--loading-progress', `${newVal}%`);
});


</script>

<template>
  <div v-if="!isLoading" class="matching-page">
    <h2 v-if="compatibleJobs.length > 0">Matches for "{{ flexworker.name }}"</h2>
    <div class="matches">
      <NuxtLink :to="`../job/get?id=${job.id}`" class="match" v-for="job in compatibleJobs" :key="job.id">
        <div class="profile-placeholder">
          <h1 class="compatibility">{{ job.compatibility }}%</h1>
        </div>
        <h1 class="job-title">{{ job.name }}</h1>
        <ul>
          <UIFeature v-for="skill in job.commonSkills" :key="skill.id" :title="skill.name" />
        </ul>
      </NuxtLink>
    </div>
    <div v-if="compatibleJobs.length <= 0">
      <h2>No matches found for "{{ flexworker.name }}"</h2>
    </div>
  </div>
  <div v-if="isLoading" class="loading-screen">
    <div class="loading-bar">
      <div class="background">
        <h1 :style="{ '--loading-progress': percentage + '%' }">Finding the perfect job for "{{ flexworker.name }}"</h1>
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

    .match:hover{
      transform: scale(1.05);
    }

    .match {
      display: flex;
      flex-direction: column;
      height: auto; /* Adjust to fit content */
      width: 14rem;
      gap: 0.5rem;
      background-color: #fff;
      border-radius: 1rem;
      box-shadow: var(--shadow-four-sides);
      padding: 1rem;
      cursor: pointer;
      text-decoration: none;
      color: var(--text-primary-color);
      transition: 0.2s;


      &:first-child {
        .profile-picture-orb {
          border-color: #4E8798;
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
          font-size: 2rem;
          font-weight: bold;
          background-color: rgba(255, 255, 255, 0.5);
          color: var(--text-primary-color);
        }
      }

      h1 {
        font-size: 1.8rem;
        font-weight: bold;
        text-align: center;
        margin: 0.5rem 0;
        line-break: anywhere;
      }

      ul {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          display: inline-block;
          background-color: var(--secondary-color);
          color: #fff;
          padding: 0.3rem 0.6rem;
          border-radius: 0.5rem;
          font-size: 0.9rem;
          font-weight: bold;
          white-space: nowrap;
        }
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


<script setup lang="ts">

import {IconType} from "~/types/global-types";

const useJob = UseJob();

const api = useRuntimeConfig().public.apiUrl;

const job = ref({name: '', address: '', description: '', minHours: '', maxHours: '', startDate: '', endDate: ''})
const originalJob = ref({
  name: '',
  address: '',
  description: '',
  minHours: '',
  maxHours: '',
  startDate: '',
  endDate: ''
})
const error = ref(null);

const isEditingname = ref(false);

const router = useRouter();
const id = router.currentRoute.value.query.id;
const isEdited = ref(false);

const showSuccessPopup = () => {
  showPopup.value = true;
  popupMessage.value = 'Changes saved!';
}

const showErrorPopup = (message: string) => {
  showPopup.value = true;
  popupMessage.value = message;
}

const showPopup = ref(false)
const popupMessage = ref("")

const shouldRedirect = ref(false);

const togglePopup = () => {
  showPopup.value = !showPopup.value;
  if (shouldRedirect.value) {
    router.push('/job');
  }
};

onMounted(async () => {
  try {
    const res = await fetch(`${api}/Job/Get?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    job.value = data;
    originalJob.value = JSON.parse(JSON.stringify(data));
    //update url
    //router.push({path: '/Job/' + data.name , query:{id}});

  } catch (err: any) {
    error.value = err.message;
    console.error('Fetch error:', err);
    showErrorPopup("Failed to fetch job data");
  }
});

const handleDelete = async () => {
  const confirmed = window.confirm("Are you sure you want to delete this job?");
  if (confirmed) {
    try {
      await useJob.deleteJob(parseInt(<string>id));
      shouldRedirect.value = true;
      popupMessage.value = "Job deleted successfully!";
      showPopup.value = true;
    } catch (err) {
      console.log(err);
      shouldRedirect.value = false;
      popupMessage.value = "An error occurred while trying to delete job";
      showPopup.value = true;
    }
  } else {
    popupMessage.value = "Job deletion canceled.";
  }
};

watch(job, (newValue) => {
  if (JSON.stringify(newValue) !== JSON.stringify(originalJob.value)) {
    isEdited.value = true;
  } else {
    isEdited.value = false;
  }
}, {deep: true});

const toggleEditName = () => {
  isEditingname.value = !isEditingname.value;
}

const saveChanges = async () => {
  try {
    const res = await fetch(`${api}/Job/Update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job.value)
    })
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    isEdited.value = false;
    originalJob.value = JSON.parse(JSON.stringify(job.value));
    showSuccessPopup();
  } catch (err: any) {
    error.value = err.message;
    console.error('Fetch error:', err);
    showErrorPopup("Failed to save changes");
  }
}

</script>

<template>
  <div class="register_page">
    <UIPopup :button-text="'Close'" @close="togglePopup" :show="showPopup">{{ popupMessage }}</UIPopup>
    <div class="window">
      <div class="profile_data">
        <div class="flex-wrapper">
          <h1 @click="toggleEditName" v-if="!isEditingname">{{ job.name || 'Name' }}</h1>
          <input v-if="isEditingname" v-model="job.name" @blur="toggleEditName" style="font-size: 1.5rem">
          <UIButtonStandard v-if="!isEdited" :content="'delete'" :icon="IconType.Edit" :action="handleDelete"/>
        </div>
          <div class="text-container">
            <label>Address:</label>
            <UIInputField id="address" :placeholder="'Address'" v-model="job.address" type="text" required/>
          </div>
          <div class="text-container">
            <label>Description:</label>
            <UIInputFieldMutliline id="description" :placeholder="'Description'" v-model="job.description"
                                   type="text" rows="5" autoResize required/>
          </div>
          <div class="text-container">
            <label>Min hours:</label>
            <UIInputField class="hours" :placeholder="'Min hours'" v-model="job.minHours" type="number"
                          required/>
          </div>
          <div class="text-container">
            <label>Max hours:</label>
            <UIInputField class="hours" :placeholder="'Max hours'" v-model="job.maxHours" type="number"
                          required/>
          </div>
          <div class="date-picker-container">
            <label>Start date:</label>
            <UIInputField class="date-picker" v-model="job.startDate" type="date" required/>
          </div>
          <div class="date-picker-container">
            <label>End date:</label>
            <UIInputField class="date-picker" v-model="job.endDate" type="date" required/>
          </div>
          <div class="save-button-container" v-if="isEdited">
            <UIButtonStandard :action="saveChanges" :icon="IconType.Edit" :content="'Save changes'"/>
          </div>
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
}

.window {
  display: flex;
  width: 50rem;
  padding: 1rem;
  flex-direction: column;
  text-align: center;
  gap: 1rem;

  border-radius: 1rem;
  background: var(--white-95, rgba(250, 250, 250, 0.95));
  box-shadow: var(--shadow-four-sides)
}

h1 {
  text-align: left; /* Align the h1 element to the left */
  margin: 0; /* Remove default margin to adjust spacing */
  padding: 0.5rem 0; /* Add some padding for better spacing */
}

.profile_data {
  display: flex;
  padding: 0 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.625rem;

  .flex-wrapper {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--gray-50);
  border-radius: 0.25rem;
  background: none;
  font-style: italic;
}

#name {
  width: 16rem;
}

#address {
  width: 16rem;
}

#description {
  width: 26rem;
}

.hours {
  width: 6rem;
}

.text-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1rem;

  label {
    width: 6rem;
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-primary-color);
    text-align: left;
  }
}

.date-picker-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1rem;

  label {
    width: 6rem;
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-primary-color);
    text-align: left;
  }

  .date-picker {
    width: 7.5rem;
  }
}

.register-button-container {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2.5rem;
  align-self: stretch;
}
</style>
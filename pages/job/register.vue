<script setup lang="ts">
import {UseJob} from "~/composables/useJob";

const { registerJob } = UseJob();
const router = useRouter();

const job = ref({
  name: "",
  address: "",
  description: "",
  minHours: "",
  maxHours: "",
  startDate: "",
  endDate: "",
});

const id = ref(null);

const shouldRedirect = ref(false);
const showPopup = ref(false);
const popupMessage = ref("");

const togglePopup = () => {
  showPopup.value = !showPopup.value;

  if (shouldRedirect.value) {
    router.push({ path: "/job/get", query: { id: id.value } });
  }
};

const showSuccessPopup = () => {
  showPopup.value = true;
  shouldRedirect.value = true;
  popupMessage.value = "Job successfully registered!";
};

const showErrorPopup = (message: string) => {
  showPopup.value = true;
  popupMessage.value = `Registration failed! \n${message}`;
};

const handleRegisterJob = async () => {
  try {
    id.value = await registerJob(job.value);
    showSuccessPopup();
  } catch (err: any) {
    console.error("Registration error:", err);
    showErrorPopup(err.message);
  }
};
</script>

<template>
  <UIPopup :show="showPopup" :buttonText="'Close'" @close="togglePopup">
    {{ popupMessage }}
  </UIPopup>
  <div class="register_page">
    <form class="window" @submit.prevent="handleRegisterJob">
      <h1>Register Job</h1>
      <div class="profile_data">
        <UIInputField id="name" placeholder="Name" v-model="job.name" type="text" required />
        <UIInputField id="address" placeholder="Address" v-model="job.address" type="text" required />
        <UIInputFieldMutliline
            id="description"
            placeholder="Description"
            v-model="job.description"
            type="text"
            rows="5"
            autoResize
            required
        />
        <UIInputField class="hours" placeholder="Min hours" v-model="job.minHours" type="number" required />
        <UIInputField class="hours" placeholder="Max hours" v-model="job.maxHours" type="number" required />
        <div class="date-picker-container">
          <label>Start date:</label>
          <UIInputField id="start-date" class="date-picker" v-model="job.startDate" type="date" required />
        </div>
        <div class="date-picker-container">
          <label>End date:</label>
          <UIInputField id="end-date" class="date-picker" v-model="job.endDate" type="date" required />
        </div>
      </div>
      <div class="register-button-container">
        <UIButtonStandard id="register-button" content="Register" />
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
h1 {
  justify-content: center;
}

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
  box-shadow: var(--shadow-four-sides);
}

.profile_data {
  display: flex;
  padding: 0 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.625rem;
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

.hours {
  width: 6rem;
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

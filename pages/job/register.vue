<script setup lang="ts">

const api = useRuntimeConfig().public.apiUrl;
const router = useRouter();

const id = ref(null);

let name = '';
let address = '';
let description = '';
let minHours = '';
let maxHours = '';
let startDate = '';
let endDate = '';

function registerJob() {
  console.log('registerJob');
  fetch(`${api}/Job/Register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      address: address,
      description: description,
      minHours: minHours,
      maxHours: maxHours,
      startDate: startDate,
      endDate: endDate
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(response => {
      console.log('Registration successful:', response);
      id.value = response;
      showSuccessPopup();
    })
    .catch(err => {
      console.error('Registration error:', err);
      showErrorPopup(err.message);
    });
}

const shouldRedirect = ref(false);
const showPopup = ref(false);
const popupMessage = ref('');

function togglePopup() {
  showPopup.value = !showPopup.value;

  if (shouldRedirect.value) {
    router.push({ path: '/job/get', query: { id: id.value } });
  }
}

function showSuccessPopup() {
  showPopup.value = true;
  shouldRedirect.value = true;
  popupMessage.value = 'Job successfully registered!';
}

function showErrorPopup(message: string) {
  showPopup.value = true;
  popupMessage.value = 'Registration failed! \n' + message;
}
</script>

<template>
  <UIPopup :show="showPopup" :buttonText="'Close'" @close="togglePopup">{{ popupMessage }}</UIPopup>
  <div class="register_page">
    <form class="window" @submit.prevent="registerJob">
      <h1>Register Job</h1>
      <div class="profile_data">
        <UIInputField id="name" :placeholder="'Name'" v-model="name" type="text" required />
        <UIInputField id="address" :placeholder="'Address'" v-model="address" type="text" required />
        <UIInputFieldMutliline id="description" :placeholder="'Description'" v-model="description" type="text" rows="5"
          autoResize required />
        <UIInputField class="hours" :placeholder="'Min hours'" v-model="minHours" type="number" required />
        <UIInputField class="hours" :placeholder="'Max hours'" v-model="maxHours" type="number" required />
        <div class="date-picker-container">
          <label>Start date:</label>
          <UIInputField class="date-picker" v-model="startDate" type="date" required />
        </div>
        <div class="date-picker-container">
          <label>End date:</label>
          <UIInputField class="date-picker" v-model="endDate" type="date" required />
        </div>
      </div>
      <div class="register-button-container">
        <UIButtonStandard :content="'Register'" />
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
  box-shadow: var(--shadow-four-sides)
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
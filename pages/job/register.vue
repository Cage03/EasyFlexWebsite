<script setup lang="ts">

const api = useRuntimeConfig().public.apiUrl;

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
      return response.text();
    })
    .then(data => {
      console.log('Registration successful:', data);
      showSuccessPopup();
    })
    .catch(err => {
      console.error('Registration error:', err);
      showErrorPopup(err.message);
    });
}

const showPopup = ref(false);
const popupMessage = ref('');

function togglePopup() {
  showPopup.value = !showPopup.value;
}

function showSuccessPopup() {
  showPopup.value = true;
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
    <div class="window">
      <form @submit.prevent="registerJob">
        <h1>Register Job</h1>
        <div class="profile_data">
          <UIInputField :placeholder="'Name'" v-model="name" type="text" required />
          <UIInputField :placeholder="'Adress'" v-model="address" type="text" required />
          <UIInputFieldMutliline :placeholder="'Description'" v-model="description" type="text" rows="5" autoResize
            required />
          <UIInputField :placeholder="'Min hours'" v-model="minHours" type="number" required />
          <UIInputField :placeholder="'Max hours'" v-model="maxHours" type="number" required />
          <UIInputField :placeholder="'Startdate'" v-model="startDate" type="date" required />
          <UIInputField :placeholder="'End date'" v-model="endDate" type="date" required />
        </div>
        <div class="register-button-container">
          <UIButtonStandard :content="'Register'" />
        </div>
      </form>
    </div>
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

  /* Shadow 4 Sides */
  box-shadow: 0px 0px 20px 0px rgba(63, 43, 79, 0.08);
}

.profile_data {
  display: flex;
  padding: 0rem 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.625rem;
}

input, textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--gray-50);
  border-radius: 0.25rem;
  background: none;
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
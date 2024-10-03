<script setup lang="ts">

const api = useRuntimeConfig().public.apiUrl;

const name = ref('');
const adress = ref('');
const dateOfBirth = ref('');
const email = ref('');
const phoneNumber = ref('');

function registerFlexworker() {
  console.log('registerFlexworker');
  fetch(`${api}/Register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name.value,
      adress: adress.value,
      dateOfBirth: dateOfBirth.value,
      email: email.value,
      phoneNumber: phoneNumber.value
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
      })
      .catch(err => {
        console.error('Registration error:', err);
      });
}
</script>

<template>
  <div class="register_page">
  <div class="window">
    <form @submit.prevent="registerFlexworker">
      <div class="profile_data_header">
        <div class="profile_picture">
          <img src="assets/icons/Generic avatar.svg" alt="Profile Picture">
        </div>
        <div class="profile_data">
          <div>
            <label for="name">Name:</label>
            <input id="name" v-model="name" type="text" required>
          </div>
          <div>
            <label for="adress">Adress:</label>
            <input id="adress" v-model="adress" type="text" required>
          </div>
          <div>
            <label for="dateOfBirth">Date of Birth:</label>
            <input id="dateOfBirth" v-model="dateOfBirth" type="date" required>
          </div>
          <div>
            <label for="email">Email:</label>
            <input id="email" v-model="email" type="email" required>
          </div>
          <div>
            <label for="phoneNumber">Phone Number:</label>
            <input id="phoneNumber" v-model="phoneNumber" type="tel" required>
          </div>
        </div>
      </div>
      <div class="skills_box">

      </div>
      <button type="submit">Register</button>
    </form>
  </div>
  </div>
</template>

<style scoped>

.register_page{
  flex: 1;
}

.window {
  display: flex;
  width: 50rem;
  height: 30rem;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;

  border-radius: 1rem;
  background: var(--white-95, rgba(250, 250, 250, 0.95));

  /* Shadow 4 Sides */
  box-shadow: 0px 0px 20px 0px rgba(63, 43, 79, 0.08);
}

.profile_picture{
  width: 18.75rem;
  height: 18.75rem;
}

.profile_data_header {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
}

.profile_data{
  display: flex;
  padding: 0rem 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.625rem;
}


</style>
<script setup lang="ts">

const api = useRuntimeConfig().public.apiUrl;

const name = ref('');
const adress = ref('');
const dateOfBirth = ref('');
const email = ref('');
const phoneNumber = ref('');

const languages = ref<string[]>([]);
const skills = ref<string[]>([]);
const certificates = ref<string[]>([]);

const newLanguage = ref('');
const newSkill = ref('');
const newCertificate = ref('');

function addLanguage(language: string) {
  if (language) {
    languages.value.push(language);
    newLanguage.value = '';
  }
}

function addSkill(skill: string) {
  if (skill) {
    skills.value.push(skill);
    newSkill.value = '';
  }
}

function addCertificate(certificate: string) {
  if (certificate) {
    certificates.value.push(certificate);
    newCertificate.value = '';
  }
}

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
            <img src="public/icons/avatar.svg" alt="Profile Picture">
          </div>
          <div class="profile_data">
            <div>
              <input placeholder="Name" id="name" v-model="name" type="text" required>
            </div>
            <div>
              <input placeholder="Adress" id="adress" v-model="adress" type="text" required>
            </div>
            <div>
              <input id="dateOfBirth" v-model="dateOfBirth" type="date" required>
            </div>
            <div>
              <input placeholder="Email" id="email" v-model="email" type="email" required>
            </div>
            <div>
              <input placeholder="Phone number" id="phoneNumber" v-model="phoneNumber" type="tel" required>
            </div>
          </div>
        </div>
        <div class="features-window">
          <div class="languages-box">
            <h1 class="feature-text">Languages</h1>
            <div class="languages">
              <div v-for="language in languages" :key="language" class="features">{{ language }}</div>
              <div class="add-language-container">
                <input placeholder="Language" type="text" v-model="newLanguage">
                <button type="button" @click="addLanguage(newLanguage)">Add</button>
              </div>
            </div>
          </div>
          <div class="skills-box">
            <h1 class="feature-text">Skills</h1>
            <div class="skills">
              <div v-for="skill in skills" :key="skill" class="features">{{ skill }}</div>
              <div class="add-skill-container">
                <input placeholder="Skill" type="text" v-model="newSkill">
                <button type="button" @click="addSkill(newSkill)">Add</button>
              </div>
            </div>
          </div>
          <div class="certificates-box">
            <h1 class="feature-text">Certificates</h1>
            <div class="certificates">
              <div v-for="certificate in certificates" :key="certificate" class="features">{{ certificate }}</div>
              <div class="add-certificate-container">
                <input placeholder="Certificate" type="text" v-model="newCertificate">
                <button type="button" @click="addCertificate(newCertificate)">Add</button>
              </div>
            </div>
          </div>
        </div>
        <div class="register-button-container">
          <UIButtonStandard :content="'Register'" />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--gray-50);
  border-radius: 0.25rem;
  background: none;
}

#name {
  font-size: x-large;
}

.register_page {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .window {
    display: flex;
    width: 50rem;
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;

    border-radius: 1rem;
    background: var(--white-95, rgba(250, 250, 250, 0.95));

    /* Shadow 4 Sides */
    box-shadow: 0px 0px 20px 0px rgba(63, 43, 79, 0.08);
  }

  .profile_picture {
    width: 18.75rem;
    height: 18.75rem;
  }

  .profile_data_header {
    display: flex;
    align-items: flex-start;
    gap: 0.625rem;
    align-self: stretch;
  }

  .profile_data {
    display: flex;
    padding: 0rem 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.625rem;
  }
}

.features-window {
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  flex: 1 0 0;
  align-self: stretch;
}

.feature-text{
  color: #000;
  font-family: Montserrat;
  font-size: 1.5rem;
  font-style: italic;
  font-weight: 700;
  line-height: normal;
}

.languages-box, .skills-box, .certificates-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
}

.languages, .skills, .certificates {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  border-radius: 1rem;
  border: 1px solid #000;
  max-width: 75%;
  min-height: 3rem;
}

.features {
  display: flex;
  padding: 0.3125rem;
  margin: 0.3125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  border-radius: 1rem;
  border: 1px solid var(--Primary-Solid, #4E8798);

  color: #000;
  font-size: 1.25rem;
  font-style: italic;
  font-weight: 700;
  line-height: normal;
}

.add-certificate-container, .add-skill-container, .add-language-container {
  display: flex;
  gap: 0.625rem;
  margin-left: auto;
}

.register-button-container{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2.5rem;
  align-self: stretch;
}


</style>
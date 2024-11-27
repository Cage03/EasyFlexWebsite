<script setup lang="ts">

import FeatureBox from "~/components/UI/FeatureBox.vue";

const api = useRuntimeConfig().public.apiUrl;

const name = ref('');
const address = ref('');
const dateOfBirth = ref('');
const email = ref('');
const phoneNumber = ref('');
const profilePictureUrl = ref('');

const phoneNumberRegex = ref("^\\+?[0-9]{1,3}[ \\-]?\\(?[0-9]{1,4}\\)?[ \\-]?[0-9]{3}[ \\-]?[0-9]{3,4}$");

const languages = ref<string[]>([]);
const skills = ref<string[]>([]);
const certificates = ref<string[]>([]);

const newLanguage = ref('');
const newSkill = ref('');
const newCertificate = ref('');

const showPopup = ref(false);
const popupMessage = ref('');

const togglePopup = () => {
  showPopup.value = !showPopup.value;
  // redirect to flexworker page
  const router = useRouter();
  router.push('/flexworker');
};

function showSuccessPopup() {
  showPopup.value = true;
  popupMessage.value = 'Registration successful!';
}

function showErrorPopup(message: string) {
  showPopup.value = true;
  popupMessage.value = 'Failure to register flexworker';
}

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

const loading = ref(false);

async function registerFlexworker() {
  if (loading.value) return;
  loading.value = true;
  try {
    const response = await fetch(`${api}/Flexworker/Register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        address: address.value,
        dateOfBirth: dateOfBirth.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        profilePictureUrl: profilePictureUrl.value,
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    console.log('Registration successful:', data);
    showSuccessPopup();
  } catch (err: any) {
    console.error('Registration error:', err);
    showErrorPopup(err.message);
  }
  loading.value = false;
}
</script>

<template>
  <UIPopup :show="showPopup" :buttonText="'Close'" @close="togglePopup">{{popupMessage}}</UIPopup>

  <div class="register_page">
    <div class="window">
      <form @submit.prevent="registerFlexworker">
        <div class="profile_data_header">
          <div class="profile_picture">
            <img src="public/icons/avatar.svg" alt="Profile Picture">
          </div>
          <div class="profile_data">
            <UIInputField placeholder="Name" v-model="name" style="font-size: 1.5rem" id="name-input" />
            <UIInputField placeholder="Address" v-model="address" id="address-input" />
            <UIInputField placeholder="Date of Birth" v-model="dateOfBirth" type="date" id="dob-input" />
            <UIInputField placeholder="Email" v-model="email" type="email" id="email-input" />
            <UIInputField placeholder="Phone number" v-model="phoneNumber" type="tel" :pattern=phoneNumberRegex title="Please enter a valid phone number (e.g., +1 234-567-8901)" required id="phone-input" />
            <UIInputField placeholder="Profile picture url" v-model="profilePictureUrl" type="url" id="profile-picture-input" />
          </div>
        </div>
        <div class="features-window">
          <FeatureBox title="Languages" :features="languages" :newFeature="newLanguage" :addFeature="addLanguage" />
          <FeatureBox title="Skills" :features="skills" :newFeature="newSkill" :addFeature="addSkill" />
          <FeatureBox title="Certificates" :features="certificates" :newFeature="newCertificate" :addFeature="addCertificate" />
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
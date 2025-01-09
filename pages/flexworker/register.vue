<script setup lang="ts">
const useFlexworker = UseFlexworker();

const router = useRouter();
const showPopup = ref(false);
const popupMessage = ref("");

const phoneNumberRegex = ref("^\\+?[0-9]{1,3}[ \\-]?\\(?[0-9]{1,4}\\)?[ \\-]?[0-9]{3}[ \\-]?[0-9]{3,4}$");

const togglePopup = () => {
  showPopup.value = !showPopup.value;
  router.push("/flexworker");
};

function showSuccessPopup() {
  showPopup.value = true;
  popupMessage.value = "Registration successful!";
}

function showErrorPopup(message: string) {
  showPopup.value = true;
  popupMessage.value = message;
}

// Features specific to this page
const languages = ref<string[]>([]);
const skills = ref<string[]>([]);
const certificates = ref<string[]>([]);

const newLanguage = ref("");
const newSkill = ref("");
const newCertificate = ref("");

function addLanguage(language: string) {
  if (language) {
    languages.value.push(language);
    newLanguage.value = "";
  }
}

function addSkill(skill: string) {
  if (skill) {
    skills.value.push(skill);
    newSkill.value = "";
  }
}

function addCertificate(certificate: string) {
  if (certificate) {
    certificates.value.push(certificate);
    newCertificate.value = "";
  }
}

const loading = ref(false);

async function registerFlexworker() {
  if (loading.value) return;
  loading.value = true;
  try {
    const flexworkerData = {
      ...useFlexworker.currentFlexworker.value,
      skills: skills.value,
    };
    
    const response = await fetchFromClient.post(
        "/Flexworker/Register",
        "main-api",
        { body: JSON.stringify({
            name: flexworkerData.name,
            address: flexworkerData.address,
            dateOfBirth:flexworkerData.dateOfBirth,
            email: flexworkerData.email,
            phoneNumber: flexworkerData.phoneNumber,
            profilePictureUrl: flexworkerData.profilePictureUrl
          }) }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    showSuccessPopup();
  } catch (err: any) {
    console.error("Registration error:", err);
    showErrorPopup("Failed to register flexworker.");
  } finally {
    loading.value = false;
  }
}
</script>


<template>
  <UIPopup :show="showPopup" :buttonText="'Close'" @close="togglePopup">{{ popupMessage }}</UIPopup>

  <div class="register_page">
    <div class="window">
      <form @submit.prevent="registerFlexworker">
        <div class="profile_data_header">
          <div class="profile_picture">
            <img src="public/icons/avatar.svg" alt="Profile Picture" />
          </div>
          <div class="profile_data">
            <UIInputField
                placeholder="Name"
                v-model="useFlexworker.currentFlexworker.value.name"
                style="font-size: 1.5rem"
                id="name-input"
            />
            <UIInputField
                placeholder="Address"
                v-model="useFlexworker.currentFlexworker.value.address"
                id="address-input"
            />
            <UIInputField
                placeholder="Date of Birth"
                v-model="useFlexworker.currentFlexworker.value.dateOfBirth"
                type="date"
                id="dob-input"
            />
            <UIInputField
                placeholder="Email"
                v-model="useFlexworker.currentFlexworker.value.email"
                type="email"
                id="email-input"
            />
            <UIInputField
                placeholder="Phone number"
                v-model="useFlexworker.currentFlexworker.value.phoneNumber"
                type="tel"
                :pattern="phoneNumberRegex"
                title="Please enter a valid phone number (e.g., +1 234-567-8901)"
                required
                id="phone-input"
            />
            <UIInputField
                placeholder="Profile picture URL"
                v-model="useFlexworker.currentFlexworker.value.profilePictureUrl"
                type="url"
                id="profile-picture-input"
            />
          </div>
        </div>

        <div class="features-window">
          <UIFeatureBox
              title="Languages"
              :features="languages"
              :newFeature="newLanguage"
              :addFeature="addLanguage"
          />
          <UIFeatureBox
              title="Skills"
              :features="skills"
              :newFeature="newSkill"
              :addFeature="addSkill"
          />
          <UIFeatureBox
              title="Certificates"
              :features="certificates"
              :newFeature="newCertificate"
              :addFeature="addCertificate"
          />
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
  padding: var(--padding-small);
  border: 1px solid var(--gray-50);
  border-radius: var(--border-radius-small);
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
    padding: var(--padding-standard);
    flex-direction: column;
    gap: var(--spacing-standard);

    border-radius: var(--border-radius-standard);
    background: var(--white-95, rgba(250, 250, 250, 0.95));

    /* Shadow 4 Sides */
    box-shadow: 0 0 20px 0 rgba(63, 43, 79, 0.08);
  }

  .profile_picture {
    width: 18.75rem;
    height: 18.75rem;
  }

  .profile_data_header {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-small);
    align-self: stretch;
  }

  .profile_data {
    display: flex;
    padding: 0 var(--padding-standard);
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: var(--spacing-small);
  }
}

.features-window {
  display: flex;
  padding: var(--spacing-standard);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-small);
  flex: 1 0 0;
  align-self: stretch;
}

.feature-text{
  color: #000;
  font-family: Montserrat, sans-serif;
  font-size: 1.5rem;
  font-style: italic;
  font-weight: 700;
  line-height: normal;
}

.languages-box, .skills-box, .certificates-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-small);
  align-self: stretch;
}

.languages, .skills, .certificates {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  border-radius: var(--border-radius-standard);
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
  gap: var(--spacing-small);
  border-radius: var(--border-radius-standard);
  border: 1px solid var(--Primary-Solid, #4E8798);

  color: #000;
  font-size: 1.25rem;
  font-style: italic;
  font-weight: 700;
  line-height: normal;
}

.add-certificate-container, .add-skill-container, .add-language-container {
  display: flex;
  gap: var(--spacing-small);
  margin-left: auto;
}

.register-button-container{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--spacing-xlarge);
  align-self: stretch;
}


</style>
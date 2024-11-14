<script setup lang="ts">
import {IconType} from "~/types/global-types";
import CategoriesBox from "~/components/UI/CategoriesBox.vue";
import AddSkillsBox from "~/components/UI/AddSkillsBox.vue";

const useFlexworker = UseFlexworker();

const flexworker = ref<flexworker>({
  id: '',
  address: '',
  name: '',
  dateOfBirth: '',
  email: '',
  phoneNumber: '',
  profilePictureUrl: '',
  skills: []
});
const originalFlexworker = ref<flexworker>({
  id: '',
  address: '',
  name: '',
  dateOfBirth: '',
  email: '',
  phoneNumber: '',
  profilePictureUrl: '',
  skills: []
});

const phoneNumberRegex = ref("^\\+?[0-9]{1,3}[ \\-]?\\(?[0-9]{1,4}\\)?[ \\-]?[0-9]{3}[ \\-]?[0-9]{3,4}$");

const restrictToNumbers = (event: KeyboardEvent) => {
  const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "+", "(", ")", " "];
  if (!/[0-9]/.test(event.key) && !allowedKeys.includes(event.key)) {
    event.preventDefault();
  }
};

const api = useRuntimeConfig().public.apiUrl;
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
    router.push('/flexworker');
  }
};


async function getFlexWorkerData() {
  try {
    const data = await useFlexworker.getFlexworker(id);
    flexworker.value = data;
    originalFlexworker.value = JSON.parse(JSON.stringify(data));
  } catch (err: any) {
    error.value = err.message;
    showErrorPopup("Error occured while trying to get flexworker");
  }
}

onMounted(async () => {
  await getFlexWorkerData();
})

watch(flexworker, (newValue) => {
  if (JSON.stringify(newValue) !== JSON.stringify(originalFlexworker.value)) {
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
    await useFlexworker.updateFlexworker(flexworker.value);
  } catch (err: any) {
    error.value = err.message;
    console.error('Fetch error:', err.message);
    showErrorPopup("Failed to save changes");
  }
  isEdited.value = false;
  originalFlexworker.value = JSON.parse(JSON.stringify(flexworker.value));
  showSuccessPopup();
}

const deleteFlexworker = async () => {
  const confirmed = window.confirm("Are you sure you want to delete this flexworker?");
  if (confirmed) {
    try {
      await useFlexworker.deleteFlexworker(parseInt(<string>id));
      shouldRedirect.value = true;
      popupMessage.value = "Flexworker deleted successfully!";
      showPopup.value = true;
    } catch (err) {
      shouldRedirect.value = false;
      popupMessage.value = "An error occurred while trying to delete flexworker";
      showPopup.value = true;
    }
  } else {
    popupMessage.value = "Flexworker deletion canceled.";
  }
}

const addSkills = ref(false);
const addSkill = () => {
  addSkills.value = !addSkills.value;
}

const reload = () => {
  addSkills.value = false;
  getFlexWorkerData();
}

</script>

<template>
  <div class="register_page">
    <UIPopup :button-text="'Close'" @close="togglePopup" :show="showPopup">{{ popupMessage }}</UIPopup>
      <AddSkillsBox v-if="addSkills" :flexworker="flexworker" @close="reload"/>
    <div class="window" v-if="!addSkills">
      <div class="profile_data">
        <div class="name-profile-picture">
          <img v-if="flexworker.profilePictureUrl" :src="flexworker.profilePictureUrl" alt="Profile picture"
               style="width: 10rem; height: 10rem; border-radius: 50%; object-fit: cover;"/>
          <div class="flex-wrapper">
            <h1 @click="toggleEditName" v-if="!isEditingname">{{ flexworker.name || 'Name' }}</h1>
            <input v-if="isEditingname" v-model="flexworker.name" @blur="toggleEditName" style="font-size: 1.5rem">
          </div>
        </div>

        <div class="text-container">
          <label for="email">Email:</label>
          <UIInputField id="email" v-model="flexworker.email" placeholder="Email" required/>
        </div>
        <div class="text-container">
          <label for="phoneNumber">Phone number:</label>
          <UIInputField id="phoneNumber" @keydown="restrictToNumbers" v-model="flexworker.phoneNumber" placeholder="Phone number"
                        type="tel" inputmode="numeric"
                        :pattern="phoneNumberRegex" title="Please enter a valid phone number (e.g., +1 234-567-8901)"
                        required/>
        </div>
        <div class="text-container">
          <label for="address">Address:</label>
          <UIInputField id="address" v-model="flexworker.address" placeholder="Address" required/>
        </div>
        <div class="date-picker-container">
          <label for="dateOfBirth">Date of birth:</label>
          <UIInputField class="date-picker" id="dateOfBirth" v-model="flexworker.dateOfBirth" type="date" required/>
        </div>
        <div class="text-container">
          <label for="profilePictureUrl">Profile picture:</label>
          <UIInputField id="profilePictureUrl" v-model="flexworker.profilePictureUrl" placeholder="Profile picture" type="url"/>
        </div>
        <CategoriesBox :skills="flexworker.skills"/>
        <UIButtonStandard :action="addSkill" :icon="IconType.Plus" :content="'Add skills'"/>

        <div class="save-button-container" v-if="isEdited">
          <UIButtonStandard :action="saveChanges" :icon="IconType.Edit" :content="'Save changes'"/>
        </div>
        <div class="delete-button">
          <UIButtonStandard :color="'red'" :icon="IconType.Trashcan" :content="'Delete'" :action="deleteFlexworker"/>
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

.name-profile-picture {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
}

.delete-button {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  align-items: center;
  gap: 2.5rem;
  align-self: stretch;
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

#address, #phoneNumber, #email, #profilePictureUrl {
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
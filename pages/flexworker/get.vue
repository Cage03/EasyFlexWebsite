<script setup lang="ts">
import {IconType} from "~/types/global-types";

const useFlexworker = UseFlexworker();

const id = ref<number | null>(null);
const error = ref<string | null>(null);
const showPopup = ref(false);
const popupMessage = ref("");
const shouldRedirect = ref(false);
const isEditingName = ref(false);
const isEdited = computed(() => {
  return JSON.stringify(useFlexworker.currentFlexworker.value) !== JSON.stringify(useFlexworker.originalFlexworker.value);
});

const phoneNumberRegex = ref("^\\+?[0-9]{1,3}[ \\-]?\\(?[0-9]{1,4}\\)?[ \\-]?[0-9]{3}[ \\-]?[0-9]{3,4}$");

const restrictToNumbers = (event: KeyboardEvent) => {
  const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "+", "(", ")", " "];
  if (!/[0-9]/.test(event.key) && !allowedKeys.includes(event.key)) {
    event.preventDefault();
  }
};

const router = useRouter();

onMounted(async () => {
  id.value = parseInt(router.currentRoute.value.query.id as string);
  if (id.value) {
    await getFlexWorkerData();
  } else {
    showErrorPopup("Invalid Flexworker ID.");
  }
});

async function getFlexWorkerData() {
  try {
    await useFlexworker.fetchFlexworkerById(id.value!);
  } catch (err: any) {
    error.value = err.message;
    showErrorPopup("Error occurred while fetching flexworker data.");
  }
}

const toggleEditName = () => {
  isEditingName.value = !isEditingName.value;
};

const saveChanges = async () => {
  try {
    await useFlexworker.saveFlexworker(useFlexworker.currentFlexworker.value);
    showSuccessPopup("Changes saved!");
  } catch (err: any) {
    error.value = err.message;
    showErrorPopup("Failed to save changes.");
  }
};

const deleteFlexworker = async () => {
  const confirmed = window.confirm("Are you sure you want to delete this flexworker?");
  if (confirmed) {
    try {
      await useFlexworker.deleteFlexworker(id.value!);
      shouldRedirect.value = true;
      popupMessage.value = "Flexworker deleted successfully!";
      showPopup.value = true;
    } catch (err: any) {
      error.value = err.message;
      showErrorPopup("An error occurred while deleting flexworker.");
    }
  } else {
    popupMessage.value = "Flexworker deletion canceled.";
  }
};

const showSuccessPopup = (message: string) => {
  showPopup.value = true;
  popupMessage.value = message;
};

const showErrorPopup = (message: string) => {
  showPopup.value = true;
  popupMessage.value = message;
};

const togglePopup = () => {
  showPopup.value = !showPopup.value;
  if (shouldRedirect.value) {
    router.push('/flexworker');
  }
};

const addSkills = ref(false);
const toggleAddSkills = () => {
  addSkills.value = !addSkills.value;
};

const reload = async () => {
  addSkills.value = false;
  await getFlexWorkerData();
};
</script>


<template>
  <div class="register_page">
    <UIPopup :button-text="'Close'" @close="togglePopup" :show="showPopup">{{ popupMessage }}</UIPopup>
    <UIAddSkillsBox v-if="addSkills" :flexworker="useFlexworker.currentFlexworker.value" @close="reload"/>
    <div class="window" v-if="!addSkills">
      <div class="profile_data">
        <div class="name-profile-picture">
          <img
              v-if="useFlexworker.currentFlexworker.value.profilePictureUrl"
              :src="useFlexworker.currentFlexworker.value.profilePictureUrl"
              alt="Profile picture"
          />
          <div class="flex-wrapper">
            <h1 @click="toggleEditName" v-if="!isEditingName">
              {{ useFlexworker.currentFlexworker.value.name || "Name" }}
            </h1>
            <input
                v-if="isEditingName"
                v-model="useFlexworker.currentFlexworker.value.name"
                @blur="toggleEditName"
                style="font-size: 1.5rem"
            />
          </div>
        </div>

        <div class="text-container">
          <label for="email">Email:</label>
          <UIInputField
              id="email"
              v-model="useFlexworker.currentFlexworker.value.email"
              placeholder="Email"
              required
          />
        </div>
        <div class="text-container">
          <label for="phoneNumber">Phone number:</label>
          <UIInputField
              id="phoneNumber"
              @keydown="restrictToNumbers"
              v-model="useFlexworker.currentFlexworker.value.phoneNumber"
              placeholder="Phone number"
              type="tel"
              inputmode="numeric"
              :pattern="phoneNumberRegex"
              title="Please enter a valid phone number (e.g., +1 234-567-8901)"
              required
          />
        </div>
        <div class="text-container">
          <label for="address">Address:</label>
          <UIInputField
              id="address"
              v-model="useFlexworker.currentFlexworker.value.address"
              placeholder="Address"
              required
          />
        </div>
        <div class="date-picker-container">
          <label for="dateOfBirth">Date of birth:</label>
          <UIInputField
              class="date-picker"
              id="dateOfBirth"
              v-model="useFlexworker.currentFlexworker.value.dateOfBirth"
              type="date"
              required
          />
        </div>
        <div class="text-container">
          <label for="profilePictureUrl">Profile picture:</label>
          <UIInputField
              id="profilePictureUrl"
              v-model="useFlexworker.currentFlexworker.value.profilePictureUrl"
              placeholder="Profile picture"
              type="url"
          />
        </div>
        <UICategoriesBox :skills="useFlexworker.currentFlexworker.value.skills"/>
        <UIButtonStandard :action="toggleAddSkills" :icon="IconType.Plus" :content="'Add skills'"/>

        <div class="save-button-container" v-if="isEdited">
          <UIButtonStandard :action="saveChanges" :icon="IconType.Edit" :content="'Save changes'"/>
        </div>
        <div class="delete-button">
          <UIButtonStandard
              :color="'red'"
              :icon="IconType.Trashcan"
              :content="'Delete'"
              :action="deleteFlexworker"
          />
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
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
}

.window {
  display: flex;
  width: 50rem;
  padding: var(--padding-standard);
  flex-direction: column;
  text-align: center;
  gap: var(--spacing-standard);

  border-radius: var(--border-radius-standard);
  background: var(--white-95, rgba(250, 250, 250, 0.95));
  box-shadow: var(--shadow-four-sides)
}

h1 {
  text-align: left; /* Align the h1 element to the left */
  margin: 0; /* Remove default margin to adjust spacing */
  padding: var(--spacing-small) 0; /* Add some padding for better spacing */
}

.profile_data {
  display: flex;
  padding: 0 var(--padding-standard);
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: var(--spacing-small);

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

  img {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    object-fit: cover;
  }
}

.delete-button {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  align-items: center;
  gap: var(--spacing-xlarge);
  align-self: stretch;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--gray-50);
  border-radius: var(--border-radius-small);
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
  gap: var(--spacing-standard);

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
  gap: var(--spacing-standard);

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
  margin-top: var(--margin-standard);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--spacing-xlarge);
  align-self: stretch;
}
</style>
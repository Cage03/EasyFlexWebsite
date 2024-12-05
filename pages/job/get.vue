<script setup lang="ts">
import {UseJob} from "~/composables/useJob";
import {IconType} from "~/types/global-types";
import {type Category, UseCategory} from "~/composables/useCategory";

const {
  currentJob,
  originalJob,
  fetchJobById,
  saveJob,
  deleteJob
} = UseJob();

const router = useRouter();
const id = router.currentRoute.value.query.id;
const showPopup = ref(false);
const popupMessage = ref("");
const skillsLoaded = ref(false);
const isEdited = computed(() =>
    JSON.stringify(currentJob.value) !== JSON.stringify(originalJob.value)
);

const skills :Skill[] = []
const togglePopup = () => {
  showPopup.value = !showPopup.value;
  if (popupMessage.value === "Job deleted successfully!") {
    router.push("/job");
  }
};

onMounted(async () => {
  try {
    await fetchJobById(parseInt(<string>id));
    await bindSkillsToPreference()
  } catch (err: any) {
    popupMessage.value = "Failed to fetch job data.";
    showPopup.value = true;
  }
});

const saveChanges = async () => {
  try {
    await saveJob(currentJob.value);
    console.log(currentJob.value)
    popupMessage.value = "Changes saved!";
    showPopup.value = true;
  } catch (err: any) {
    popupMessage.value = "Failed to save changes.";
    showPopup.value = true;
  }
};

// Delete the job
const handleDelete = async () => {
  const confirmed = window.confirm("Are you sure you want to delete this job?");
  if (confirmed) {
    try {
      await deleteJob(parseInt(<string>id));
      popupMessage.value = "Job deleted successfully!";
      showPopup.value = true;
    } catch (err: any) {
      popupMessage.value = "Failed to delete job.";
      showPopup.value = true;
    }
  }
};

const addPreferences = ref(false);
const toggleAddPreference = () => {
  addPreferences.value = !addPreferences.value;
};
const getSkillName = (skillId: number) => {
  return skills.find(value => value.id === skillId)?.name || 'Unknown Skill';
}
const updateIsRequired = (preference: Preference, event: Event) => {
  preference.isRequired = (event.target as HTMLInputElement).checked
  if (preference.isRequired) {
    preference.weight = 100; // Set the weight to 100 when checkbox is checked
  }
}

const updateWeight = (preference: Preference, event:Event ) =>{
  preference.weight = Number((event.target as HTMLInputElement).value );
}

// This is not a clean way of loading skills purely for the sake of giving the preferences their skill names
// This problem was brought up to others, but not deemed necessary
const bindSkillsToPreference = async () =>{
  const useCategory = UseCategory();
  const limit = 100;
  const page = ref(1)
  let response = await useCategory.fetchCategories(limit, page.value);
  const jobCategories = ref<Category[]>([]);
  jobCategories.value = response;

  if (currentJob.value.preferences.length > 0) {
    jobCategories.value.forEach(category => {
      category.skills.forEach(skill => {
        // Check if the skillId matches any preferences
        const isSkillInPreferences = currentJob.value.preferences.some(pref => pref.skillId === skill.id);
        if (isSkillInPreferences) {
          // Add the matching skill to the skillsList
          skills.push(skill);
        }
      });
    });
  }

  skillsLoaded.value = true
}
</script>

<template>
  <div class="job-page">
    <!-- Popup Message -->
    <UIPopup :button-text="'Close'" @close="togglePopup" :show="showPopup">
      {{ popupMessage }}
    </UIPopup>
    <UIAddPreferencesBox v-if="addPreferences" :skills="skills" :preferences="currentJob.preferences" @close="toggleAddPreference"/>
    <div class="window"  v-if="!addPreferences">
      <div class="profile-data">
        <!-- Editable Job Name -->
        <div class="flex-wrapper">
          <h1 v-if="!isEdited">{{ currentJob.name || "Name" }}</h1>
          <input
              v-model="currentJob.name"
              placeholder="Job Name"
              @input="togglePopup"
              style="font-size: 1.5rem"
          />
        </div>

        <!-- Other Job Fields -->
        <div class="text-container">
          <label>Address:</label>
          <UIInputField v-model="currentJob.address" placeholder="Address"/>
        </div>
        <div class="text-container">
          <label>Description:</label>
          <UIInputFieldMutliline v-model="currentJob.description" placeholder="Description" rows="5"/>
        </div>
        <div class="text-container">
          <label>Min Hours:</label>
          <UIInputField v-model="currentJob.minHours" type="number" placeholder="Min Hours"/>
        </div>
        <div class="text-container">
          <label>Max Hours:</label>
          <UIInputField v-model="currentJob.maxHours" type="number" placeholder="Max Hours"/>
        </div>
        <div class="date-picker-container">
          <label>Start Date:</label>
          <UIInputField v-model="currentJob.startDate" type="date"/>
        </div>
        <div class="date-picker-container">
          <label>End Date:</label>
          <UIInputField v-model="currentJob.endDate" type="date"/>
        </div>

        <div>
          <div v-for="preference in currentJob.preferences">
            <UIFeature :title="getSkillName(preference.skillId)" v-if="skillsLoaded">
              <div class="preference-item">
                <label for="weightInput">Weight:</label>
                <input id="weightInput" v-model="preference.weight" @change="updateWeight(preference, $event)"
                       type="range" readonly :disabled="preference.isRequired === true"
                       min="0"  max="100" step="1"/>
                <span>{{ preference.weight }}%</span>
              </div>
              <div class="preference-item">
                <label for="checkboxInput">required:</label>
                <input id="checkboxInput" v-model="preference.isRequired" @change="updateIsRequired(preference, $event)" type="checkbox"/>
              </div>
            </UIFeature>

          </div>
        </div>

        <div class="Add-Preference-container">
          <UIButtonStandard :action="toggleAddPreference" :icon="IconType.Plus" :content="'Add skills'"/>
        </div>
        <!-- Save Changes Button -->
        <div v-if="isEdited" class="save-button-container">
          <UIButtonStandard :action="saveChanges" :content="'Save Changes'"/>
        </div>

        <!-- Delete Job Button -->
        <div class="delete-button">
          <UIButtonStandard :color="'red'" :action="handleDelete" :content="'Delete'"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.preference-item{
  display: flex;
  align-items: center;
  label{
    font-weight: normal;
  }
  span{
    font-weight: bold;
  }
}
.job-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.window {
  display: flex;
  flex-direction: column;
  width: 50rem;
  padding: 1rem;
  text-align: center;
  gap: 1rem;
  border-radius: 1rem;
  background: var(--white-95, rgba(250, 250, 250, 0.95));
  box-shadow: var(--shadow-four-sides);
}

.profile-data {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  text-align: left;

  .flex-wrapper {
    display: flex;
    justify-content: space-between;
  }
}

.text-container {
  display: flex;
  gap: 1rem;
  align-items: center;

  label {
    width: 6rem;
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-primary-color);
  }
}

.date-picker-container {
  display: flex;
  gap: 1rem;
  align-items: center;

  label {
    width: 6rem;
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-primary-color);
  }
}

.save-button-container {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.delete-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}
</style>

<script setup lang="ts">
import { IconType } from "~/types/global-types";

const useFlexworker = UseFlexworker();

interface flexworkerContent {
  id: string,
  name: string,
  adress: string,
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  profilePictureUrl: string;
}

const api = useRuntimeConfig().public.apiUrl;
const responseMap = ref<flexworkerContent>({ id: '', adress: '', name: '', dateOfBirth: '', email: '', phoneNumber: '', profilePictureURL: '' });
const error = ref(null);

// get id from query params
const router = useRouter();
const id = router.currentRoute.value.query.id;

let viewableDate;
let fieldChanged = false;
let continueWatch = true;
const local = ref(responseMap.value);
const shouldRedirect = ref(false);
const showPopup = ref(false);
const showConfirmationPopup = ref(false);
const popupMessage = ref('');
const popupButtonText = ref('Close')

const togglePopup = () => {
  showPopup.value = !showPopup.value;
  if (shouldRedirect.value) {
    router.push('/flexworker');
  }
};

onMounted(async () => {
  await handleFetch()
});

const editMode = ref({
  name: false,
  adress: false,
  email: false,
  phoneNumber: false,
  dateOfBirth: false
});


watch(() => responseMap.value, (newValue) => {
  if (newValue && continueWatch) {
    local.value = { ...newValue };
    local.value.dateOfBirth = local.value.dateOfBirth.toString().split('T')[0]

    viewableDate = convertToViewAble(new Date(local.value.dateOfBirth));
    //Prevents props from syncing with the local which is needed to check if a field has changed and not remained the same
    continueWatch = false
  }

});

const handleFieldChange = (field: keyof Content) => {
  if (local.value[field] !== '') {
    editMode.value[field] = false;
    checkIfFieldsChanged()
    viewableDate = convertToViewAble(new Date(local.value.dateOfBirth));
  }
};
function checkIfFieldsChanged() {
  fieldChanged = false;

  for (const key in responseMap.value) {

    const field = key as keyof flexworkerContent;
    console.log("i am here " + field);

    const localValue = local.value[field];

    const propValue = (field === 'dateOfBirth')
      ? responseMap.value[field].toString().split('T')[0]
      : responseMap.value[field];
    if (String(localValue) !== String(propValue)) {
      fieldChanged = true;
      break;
    }
  }
}

function convertToViewAble(date) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
}
async function handleFetch() {

  continueWatch = true;
  try {
    const res = await fetch(`${api}/Flexworker/GetById?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }


    const data = await res.json();
    responseMap.value = data;
    router.push({ path: '/flexworker/get', query: { id } });


  } catch (err: any) {
    error.value = err.message;
    console.error('Fetch error:', err);
    router.push('/flexworker/notFound');
  }
}
const deleteFlexWorker = async () => {
  const confirmed = window.confirm("Are you sure you want to delete this flexworker?");
  if (confirmed) {
    try {
      console.log("calling delete");
      await useFlexworker.deleteFlexworker(parseInt(<string>id));
      shouldRedirect.value = true;
      popupMessage.value = "Flexworker deleted successfully!";
      showPopup.value = true;
      console.log('FlexWorker deleted successfully!');

    } catch (err: any) {
      console.log(err);
      shouldRedirect.value = false;
      popupMessage.value = "An error occurred while trying to delete the flexworker";
      showPopup.value = true;
    }
  } else {
      popupMessage.value = "Job deletion canceled.";
    }
  };

  async function handleUpdate() {
    let confirmation = window.confirm("Are you sure you want to save")
    if (confirmation) {
      const content = ref<flexworkerContent>({
        id: id,
        name: local.value.name,
        adress: local.value.adress,
        dateOfBirth: local.value.dateOfBirth,
        email: local.value.email,
        phoneNumber: local.value.phoneNumber,
        profilePictureUrl: local.value.profilePictureUrl
      })

      const res = await fetch(`${api}/Flexworker/Update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(content.value)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          } else {
            handleFetch()
          }
        })
        .then(data => {
          console.log('Registration successful:', data);
          showSuccessPopup('You have updated successfully!');
          fieldChanged = false;
        })
        .catch(err => {
          console.error('Registration error:', err);
          showErrorPopup(err.message);
        });
    }
  }

  
  const toggleConfirmationPopup = () => {
    showConfirmationPopup.value = !showConfirmationPopup.value;
  };

  function showSuccessPopup(message: string) {
    togglePopup()
    popupButtonText.value = 'Close'
    popupMessage.value = message;
  }

  function showErrorPopup(message: string) {
    togglePopup()
    popupButtonText.value = 'Close'
    popupMessage.value = 'The update was unsuccessful \n' + message;
  }
</script>

<template>
  <UIPopup :show="showPopup" :buttonText="popupButtonText" @close="togglePopup" @xButtonFunction="togglePopup">
    {{ popupMessage }}</UIPopup>
  <!--  <UIConfirmationPopUp :show="showConfirmationPopup" :buttonTextCancel="cancel" :buttonTextConfirm="Confirm" @cancel="toggleConfirmationPopup" @confirm="handleUpdate" ></UIConfirmationPopUp>-->

  <div class="register_page">
    <div class="window">
      <form @submit.prevent="handleUpdate">
        <div class="profile_data_header">

          <div class="profile_picture">
            <img :src="local.profilePictureUrl" alt="Profile Picture" style="    width: 18.75rem; height: 18.75rem" />
          </div>

          <div class="profile_data">
            <div @click="editMode.name = true" class="editable-field">
              <h1 class="text" v-if="!editMode.name">{{ local.name }}</h1>
              <UIInputField v-else @blur="handleFieldChange('name')" @keydown.enter="handleFieldChange('name')"
                v-model="local.name" placeholder="Name" style="font-size: 1.5rem" />
            </div>

            <div @click="editMode.adress = true" class="editable-field">
              <p class="text" v-if="!editMode.adress">{{ local.adress }}</p>
              <UIInputField v-else @blur="handleFieldChange('adress')" @keydown.enter="handleFieldChange('adress')"
                v-model="local.adress" placeholder="Adress" />
            </div>
            <div @click="editMode.email = true" class="editable-field">
              <p class="text" v-if="!editMode.email">{{ local.email }}</p>
              <UIInputField v-else @blur="handleFieldChange('email')" @keydown.enter="handleFieldChange('email')"
                v-model="local.email" placeholder="Email" type="email" />
            </div>
            <div @click="editMode.dateOfBirth = true" class="editable-field">
              <p class="text" v-if="!editMode.dateOfBirth">{{ viewableDate }}</p>
              <UIInputField v-else @blur="handleFieldChange('dateOfBirth')"
                @keydown.enter="handleFieldChange('dateOfBirth')" v-model="local.dateOfBirth"
                placeholder="Date of Birth" type="date" />
            </div>
            <div @click="editMode.phoneNumber = true" class="editable-field">
              <p class="text" v-if="!editMode.phoneNumber">{{ local.phoneNumber }}</p>
              <UIInputField v-else @blur="handleFieldChange('phoneNumber')"
                @keydown.enter="handleFieldChange('phoneNumber')" v-model="local.phoneNumber" placeholder="Phone number"
                type="tel" />
            </div>
            
            <!--            <UIInputField placeholder="Profile picture url" v-model="profilePictureUrl" type="url" />-->
          </div>
        </div>

        <!--        <div class="features-window">-->
        <!--          <FeatureBox title="Languages" :features="languages" :newFeature="newLanguage" :addFeature="addLanguage" />-->
        <!--          <FeatureBox title="Skills" :features="skills" :newFeature="newSkill" :addFeature="addSkill" />-->
        <!--          <FeatureBox title="Certificates" :features="certificates" :newFeature="newCertificate" :addFeature="addCertificate" />-->
        <!--        </div>-->
        <!--        <div class="register-button-container">-->
        <!--          <UIButtonStandard :content="'Register'" />-->
        <!--        </div>-->
        <UIButtonStandard v-if="fieldChanged" :content="'Save changes'"></UIButtonStandard>

      </form>
      <div class="delete-button">
        <UIButtonStandard :color="'red'" :icon="IconType.Trashcan" :content="'Delete'" :action="deleteFlexWorker" />
      </div>
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

.delete-button {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  align-items: center;
  gap: 2.5rem;
  align-self: stretch;
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

.feature-text {
  color: #000;
  font-family: Montserrat;
  font-size: 1.5rem;
  font-style: italic;
  font-weight: 700;
  line-height: normal;
}

.languages-box,
.skills-box,
.certificates-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
}

.languages,
.skills,
.certificates {
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

.add-certificate-container,
.add-skill-container,
.add-language-container {
  display: flex;
  gap: 0.625rem;
  margin-left: auto;
}

.register-button-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2.5rem;
  align-self: stretch;
}
</style>
<script setup lang="ts">
import {IconType} from "~/types/global-types";

const api = useRuntimeConfig().public.apiUrl;
const router = useRouter();
const id = router.currentRoute.value.query.id;

interface ContentProps {
  name: string,
  adress: string,
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  profilePictureUrl: string;
}
let props = defineProps({
  
  content: {
    type: Object as () => ContentProps,
    required: true
  }
})

const editMode = ref({
  name: false,
  adress: false,
  email: false,
  phoneNumber: false,
  dateOfBirth: false
});

let viewableDate;
let fieldChanged = false;
let continueWatch = true;
const local = ref(props.content);
const emit = defineEmits<{(event: 'updateEvent', payload: object): void }>()

watch(() => props.content, (newValue) => {
  if(newValue && continueWatch) {
    local.value = { ...newValue };
    local.value.dateOfBirth =  local.value.dateOfBirth.toString().split('T')[0]

    viewableDate = convertToViewAble( new Date(local.value.dateOfBirth));
    //Prevents props from syncing with the local which is needed to check if a field has changed and not remained the same
    continueWatch = false
  }

});

const saveText = (field: keyof Content) => {
  if (local.value[field] !== '' ) {
    editMode.value[field] = false;
    checkFfFieldsChanged()
    viewableDate = convertToViewAble( new Date(local.value.dateOfBirth));
    console.log(fieldChanged)
  }
};
function checkFfFieldsChanged(){
  fieldChanged = false;
  
  for (const key in props.content) {
    
    const field = key as keyof ContentProps;
    console.log("i am here " + field);

    const localValue = local.value[field];

    const propValue = (field === 'dateOfBirth')
        ? props.content[field].toString().split('T')[0]
        : props.content[field];
    if (String(localValue) !== String(propValue)) {
      fieldChanged = true;
      break; 
    }
  }
}
function handleUpdate(){
  
  emit("updateEvent", local.value);
  fieldChanged = false;
}

function convertToViewAble(date){
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
}

const deleteFlexWorker = async () => {
  try {
    const res = await fetch(`${api}/Flexworker/Delete?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    console.log('FlexWorker deleted successfully!');
    
    router.push('/flexworker/index');
    
  } catch (err: any) {
    console.error('Delete error:', err.message);
  }
};
</script>

<template>
  <div class="box">
    <div class="deleteButton">
      <UIButtonStandard :color="'red'" :icon="IconType.Trashcan" :content="'Delete'" :action="deleteFlexWorker" />
    </div>

    <div class="profilePicture">
      <img :src="local.profilePictureUrl" alt="Profile Picture" />
    </div>

    <div class="textContainer">
      
        <div @click="editMode.name = true" class="editable-field">
          <h1 class="text" v-if="!editMode.name">{{local.name}}</h1>
          <UIInputField v-else  @blur="saveText('name')" @keydown.enter="saveText('name')"
                        v-model="local.name" placeholder="Name" style="font-size: 1.5rem"/>
        </div>
        <div @click="editMode.adress = true" class="editable-field">
          <p class="text" v-if="!editMode.adress">{{local.adress}}</p>
          <UIInputField  v-else  @blur="saveText('adress')" @keydown.enter="saveText('adress')"
                         v-model="local.adress" placeholder="Adress" />
        </div>
        <div @click="editMode.email = true" class="editable-field">
          <p class="text" v-if="!editMode.email">{{local.email}}</p>
          <UIInputField v-else @blur="saveText('email')" @keydown.enter="saveText('email')" 
                        v-model="local.email" placeholder="Email"  type="email" />
        </div>
        <div @click="editMode.dateOfBirth = true" class="editable-field">
          <p class="text" v-if="!editMode.dateOfBirth">{{viewableDate}}</p>
          <UIInputField v-else  @blur="saveText('dateOfBirth')" @keydown.enter="saveText('dateOfBirth')"
                        v-model="local.dateOfBirth" placeholder="Date of Birth"  type="date" />
        </div>
        <div @click="editMode.phoneNumber = true" class="editable-field">
          <p class="text" v-if="!editMode.phoneNumber">{{local.phoneNumber}}</p>
          <UIInputField v-else  @blur="saveText('phoneNumber')" @keydown.enter="saveText('phoneNumber')"
                        v-model="local.phoneNumber" placeholder="Phone number" type="tel" />
        </div>
      <UIButtonStandard v-if="fieldChanged" content="Save changes" @click="handleUpdate"></UIButtonStandard>
    </div>


    <div class="detailFlexBox">
      <div class="detailContainer">
      <p class="detailTitle">Languages:</p>
      <div class="detailBox">
          <p>Dutch</p>
          <p>English</p>
          <p>French</p>
      </div>
    </div>
    
    <div class="detailContainer">
      <p class="detailTitle">Skills:</p>
      <div class="detailBox">
          <p>programming</p>
          <p>front-end</p>
          <p>design</p>
      </div>
    </div>
    <div class="detailContainer">
      <p class="detailTitle">Certificates:</p>
      <div class="detailBox">
          <p>VWO</p>
          <p>Forklift license</p>
          <p>HBO ICT</p>
      </div>
    </div>
    
    </div>

    
  </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@750;1000&display=swap');

.detailTitle {
  font-size: 20px;
  width: 15rem;
}
.editable-field {
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}
.detailFlexBox {
  display: flex;
  flex-direction: column;
}

.detailContainer {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 5%;
}

.detailContainer p {
  margin-right: 20px;
}

.detailBox {
  display: flex;
  gap: 10px;
  border-radius: 15px;
  border: 2px solid #000;
  padding: 10px;
  flex-wrap: wrap;
  width: 100%;
}

.detailBox p {
  border-style: solid;
  border-color: #bababa;
  border-width: 2px;
  padding: 10px;
  margin: 0;
  border-radius: 10px;
}
.inputBox {
  display: flex;
  gap: 10px;
  border-radius: 15px;
  padding: 10px;
  flex-wrap: wrap;
  width: 100%;
}

.inputBox.xl{
  font-size: 24px;
}

.box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-family: 'Montserrat', sans-serif;
  background-color: #ffffff;
  padding: 1%;
  margin-left: 25%;
  border-radius: 15px;
  box-shadow: 0px 0px 20px -10px;
  width: 50%;
  height: auto;
  position: relative;
}

.deleteButton {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
}

.profilePicture img {
  margin-top: 15%;
  height: 15rem;
  width: 15rem;
}

.textContainer {
  display: flex;
  flex-direction: column;
  margin-left: 3%;
  margin-right: 30%;
}

.text {
  margin: 5%;
}
.text:hover {
  color: #acacac;
}

</style>
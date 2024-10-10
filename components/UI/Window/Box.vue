<script setup lang="ts">
import InputField from "~/components/UI/InputField.vue";

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
const local = ref(props.content);
const emit = defineEmits<{(event: 'updateEvent', payload: object): void }>()

watch(() => props.content, (newValue) => {
  local.value = { ...newValue };
  local.value.dateOfBirth =  local.value.dateOfBirth.toString().split('T')[0]

  convertToViewAble( new Date(local.value.dateOfBirth));
});

const saveText = (field: keyof Content) => {
  if (local.value[field]?.toString() !== '') {
    editMode.value[field] = false;
    fieldChanged = true
    props.content[field] = local.value[field];
    convertToViewAble( new Date(local.value.dateOfBirth));
    console.log(local.value);

  }
};

function handleUpdate(){
  
  emit("updateEvent", props.content);
  fieldChanged = false;
}

function convertToViewAble(date){
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  viewableDate =  date.toLocaleDateString('en-GB', options);
}
</script>

<template>
  <div class="box">
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
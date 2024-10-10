<script setup lang="ts">
import {IconType} from "~/types/global-types";

let props = defineProps({
  
  content: {
    name: {
      type: String,
      required: false
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    profilePictureUrl: {
      type: String,
      required: true
    },
  },
})

const editMode = ref({
  name: false,
  email: false,
  phoneNumber: false,
  dateOfBirth: false
});

let viewableDate;
const local = ref(props.content);

watch(() => props.content, (newValue) => {
  local.value = { ...newValue };
  local.value.dateOfBirth =  local.value.dateOfBirth.toString().split('T')[0]

  convertToViewAble( new Date(local.value.dateOfBirth));
  console.log(viewableDate);
  console.log(local.value.profilePictureUrl);
});

const saveText = (field: keyof Content) => {
  if (local.value[field]?.toString() !== '') {
    editMode.value[field] = false;

    props.content[field] = local.value[field];
    convertToViewAble( new Date(local.value.dateOfBirth));
    console.log(local.value);
  }
};

function convertToViewAble(date){
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  viewableDate =  date.toLocaleDateString('en-GB', options);
}
</script>

<template>
  <div class="box">
    <div class="deleteButton">
      <UIButtonStandard :color="'red'" :icon="IconType.Trashcan" :content="'Delete'" />
    </div>

    <div class="profilePicture">
      <img :src="content.profilePictureURL || '/icons/avatar.svg'" alt="Profile Picture" />
    </div>

    <div class="textContainer">
      
        <div @click="editMode.name = true" class="editable-field">
          <h1 class="text" v-if="!editMode.name">{{local.name}}</h1>
          <input v-else class="inputBox xl" type="text" @blur="saveText('name')" @keydown.enter="saveText('name')" v-model="local.name">
        </div>

        <div @click="editMode.email = true" class="editable-field">
          <p class="text" v-if="!editMode.email">{{local.email}}</p>
          <input v-else class="inputBox" type="email" @blur="saveText('email')" @keydown.enter="saveText('email')" v-model="local.email">
        </div>
        <div @click="editMode.dateOfBirth = true" class="editable-field">
          <p class="text" v-if="!editMode.dateOfBirth">{{viewableDate}}</p>
          <input v-else class="inputBox" type="date" @blur="saveText('dateOfBirth')" @keydown.enter="saveText('dateOfBirth')" v-model="local.dateOfBirth">
        </div>
        <div @click="editMode.phoneNumber = true" class="editable-field">
          <p class="text" v-if="!editMode.phoneNumber">{{local.phoneNumber}}</p>
          <input v-else class="inputBox" type="tel" @blur="saveText('phoneNumber')" @keydown.enter="saveText('phoneNumber')" v-model="local.phoneNumber">
        </div>
      
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
  margin-left: 0%;
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
<script setup lang="ts">
import {SignatureHelpTriggerKind} from "vscode-languageserver-protocol";
import ContentChange = SignatureHelpTriggerKind.ContentChange;

const editMode = ref({
  name: false,
  email: false,
  phoneNumber: false,
  dateOfBirth: false
});
let props = defineProps({
  content: {
    type: Object as () => {
      name: string;
      dateOfBirth: string;
      email: string;
      phoneNumber: string;
    },
    required: true,
  },
})

let viewableDate;
const local = ref(props.content);

watch(() => props.content, (newValue) => {
  local.value = { ...newValue };
  local.value.dateOfBirth =  local.value.dateOfBirth.toString().split('T')[0]

  convertToViewAble( new Date(local.value.dateOfBirth));
  console.log(viewableDate);
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
    <div @click="editMode.name = true" class="editable-field">
      <h1 class="text" v-if="!editMode.name">{{local.name}}</h1>
      <input v-else class="box" type="text" @blur="saveText('name')" @keydown.enter="saveText('name')" v-model="local.name">
    </div>

    <div @click="editMode.email = true" class="editable-field">
      <p class="text" v-if="!editMode.email">{{local.email}}</p>
      <input v-else class="box" type="email" @blur="saveText('email')" @keydown.enter="saveText('email')" v-model="local.email">
    </div>
    <div @click="editMode.dateOfBirth = true" class="editable-field">
      <p class="text" v-if="!editMode.dateOfBirth">{{viewableDate}}</p>
      <input v-else class="box" type="date" @blur="saveText('dateOfBirth')" @keydown.enter="saveText('dateOfBirth')" v-model="local.dateOfBirth">
    </div>
    <div @click="editMode.phoneNumber = true" class="editable-field">
      <p class="text" v-if="!editMode.phoneNumber">{{local.phoneNumber}}</p>
      <input v-else class="box" type="tel" @blur="saveText('phoneNumber')" @keydown.enter="saveText('phoneNumber')" v-model="local.phoneNumber">
    </div>
  </div>

  
  <button type="submit" ></button>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@750;1000&display=swap');

.text:hover {
  color: #acacac;
}

.box {
  font-family: 'Montserrat', sans-serif;
  background-color: #ffffff;
  padding: 15px;
  margin: 15px;
  border-radius: 15px;
  box-shadow: 0px 0px 20px -10px;
}
.box h1 {
  font-size: 3em;
  margin: 0;
}
/*.box input {
  font-size: 3em;
  margin: 0;
}*/
.box p {
  font-size: 1em;
}

.editable-field {
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}


</style>
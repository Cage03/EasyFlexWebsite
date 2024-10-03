<script setup lang="ts">

let props = defineProps({
  title: {
    type: String,
    required: false
  },
  content: {
    dateOfBirth:{
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
    }
    
  },

  
})
</script>

<template>

  <div class="box">
    <h1 class="text">{{title}}</h1>
    <p class="text">{{content.email}}</p>
    <p class="text">{{content.dateOfBirth}}</p>
    <p class="text">{{content.phoneNumber}}</p>
  </div>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@750;1000&display=swap');


.text:hover {
  color: #acacac;
}

.box {
  font-family: 'Montserrat', sans-serif;
  background-color: #ffffff;
  border: 1px solid #c3c3c3;
  padding: 15px;
  margin: 15px;
}

.box h1 {
  font-size: 3em;
  margin: 0;
}

.box p {
  font-size: 1em;
}

</style>
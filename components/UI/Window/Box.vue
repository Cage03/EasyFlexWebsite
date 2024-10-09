<script setup lang="ts">

let props = defineProps({
  title: {
    type: String,
    required: false
  },
  content: {
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
    profilePictureURL: {
      type: String,
      required: true
    },

  },


})
</script>

<template>
  <div class="box">
    <div class="profilePicture">
      <img :src="content.profilePictureURL || 'assets/icons/Generic avatar.svg'" alt="Profile Picture" />
    </div>

    <div class="textContainer">
      <h1 class="text">{{ title }}</h1>
      <p class="text">{{ content.email }}</p>
      <p class="text">{{ content.dateOfBirth }}</p>
      <p class="text">{{ content.phoneNumber }}</p>
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
  margin-right: 50%;
}

.text {
  margin: 5%;
}
.text:hover {
  color: #acacac;
}

</style>
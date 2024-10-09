<template>
  <div class="job-overview-page">
    <div class="overview-container">
      <div class="functionality">
        <div class="search-bar-container">
          <UISearch/>
        </div>
        <div class="buttons">
          <UIButtonStandard :icon="IconType.Plus" :content="'Create New'"/>
        </div>
      </div>
      <div class="overview">
        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {IconType} from "~/types/global-types";
</script>

<style scoped lang="scss">
.job-overview-page{
  height:100%;
  width:100%;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  .overview-container{
    width:70%;
    display: flex;
    flex-direction: column;
    align-items:center;
    gap:1.5rem;
    
    .functionality{
      width:100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .search-bar-container{
        width:27.5rem;
        flex-shrink: 1;
      }
      
      .buttons{
        display: flex;
        flex-direction: row;
        gap:1rem;
        flex-shrink: 0;
      }
    }

    .overview {
      height: 42rem;
      width: 100%;
      background: url("../../assets/images/background.jpg") no-repeat center center;
      background-size: cover; 
      border-radius: 1rem;
      overflow:auto;
    }
  }
}
</style>
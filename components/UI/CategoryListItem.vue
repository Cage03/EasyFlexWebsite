<script setup lang="ts">

import {IconType} from "~/types/global-types";

interface Skill {
  id: string,
  name: string
}
interface Category {
  id: string;
  name: string;
  skills: Skill[];
}
const props = defineProps<{
  category: Category;
  action?: () => void;
}>();

const collapsableValue= ref(false);

const toggleCollapsable = () => {
  collapsableValue.value = !collapsableValue.value;
  console.log(collapsableValue.value);
}


</script>

<template>
<div class="list-item">
  <div class="popup-buttons">
    <button class="collapsible"   @click="toggleCollapsable"><p><i v-if="!collapsableValue" class="arrow right"></i> <i v-else class="arrow down"></i> {{category.name}}</p></button>
    <UIButtonStandard :action="action" :color="'transparent'" :icon="IconType.Edit"></UIButtonStandard>
  </div>

  <div v-if='collapsableValue'>
    <div class="properties" v-for="skill in category.skills" :key="skill.id">
      {{skill.name}}
    </div>
    <div>(+)</div>
  </div>
</div>
</template>

<style scoped lang="scss">
.list-item {
  position: relative;
  width: calc(100% - (4rem + 4px));
  padding: 0.5rem 2rem;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  border-radius: 1rem;
  border: 2px solid var(--text-primary-color);
  align-items: center;

  .properties {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    width: 100%;

    p {
      width:20rem;
      font-weight: 700;
      font-family: Montserrat, sans-serif;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex-basis: 25%;
      flex-shrink: 0;
    }

  }
  .collapsible {
    background-color:  #fff;
    cursor: pointer;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
  }
  .icon {
    margin-top: -0.5rem;
    cursor: pointer;
  }
}
.arrow {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}
.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
.popup-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
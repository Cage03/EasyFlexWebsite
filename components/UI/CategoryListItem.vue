<script setup lang="ts">

import type {Category} from "~/composables/useCategory";
import Feature from "~/components/UI/Feature.vue";
import {IconType} from "~/types/global-types";

const props = defineProps<{
  category: Category;
  action?: () => void;
}>();

const collapsableValue= ref(false);

const emit = defineEmits(['openAddSkillModal', 'deleteSkill']);

const toggleCollapsable = () => {
  collapsableValue.value = !collapsableValue.value;
}

const openAddSkillModal = () => {
  emit('openAddSkillModal', props.category.id);
}

const deleteSkill = (skillId: number) => {
  emit('deleteSkill', skillId);
};

</script>

<template>
<div class="list-item">
  <div class="popup-buttons">
    <button class="collapsible"   @click="toggleCollapsable"><p><i v-if="!collapsableValue" class="arrow right"></i> <i v-else class="arrow down"></i> {{category.name}}</p></button>
    <UIButtonStandard :action="action" :color="'transparent'" :icon="IconType.Edit"></UIButtonStandard>
  </div>

  <div v-if='collapsableValue'>
    <div class="properties">
      <Feature v-for="skill in category.skills" :key="skill.id" :title="skill.name" :onclick="() => deleteSkill(skill.id)" class="feature">
      </Feature>
      <UIButtonStandard :action="openAddSkillModal" :icon="IconType.Plus"></UIButtonStandard>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">

.feature {
  position: relative;

  :hover{
    transition: 0.2s;
    background-color: #d23535;
    color: white;
  }
}

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
    flex-wrap: wrap;
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
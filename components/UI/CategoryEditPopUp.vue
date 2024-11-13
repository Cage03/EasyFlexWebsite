<script setup lang="ts">
import {IconType} from "~/types/global-types";

interface Category {
  id: string;
  name: string;
}
const props = defineProps<{
  show: Boolean,
  category:Category,
}>()

const emit = defineEmits<{
  close: [],
  deleteCategory:[id:String],
  updateCategory:[category:Category],
}>()

const closePopup = () => {
  emit('close');
};
const emitDelete =() =>{
  emit('deleteCategory', props.category.id);
}
const emitUpdate=() =>{
  emit('updateCategory',props.category);
}
</script>

<template>
  <div :class="['popup-overlay', { 'popup-show': show }]">
    <div class="popup-content">
      <UIIcon :icon="IconType.X_symbol" class="close-button" @click="closePopup()"/>
      <div class="popup-text">
        <UIInputField v-model="category.name" type="text" />
      </div>
      <div class="popup-buttons">
        <UIButtonStandard @click="emitDelete" :color="'red'" :icon="IconType.Trashcan" :content="'Delete'"/>
        <UIButtonStandard @click="emitUpdate" :color="'blue'" :icon="IconType.Edit" :content="'Update'" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  opacity: 0;
  transition: all 0.3s ease;
}

.popup-show {
  opacity: 1;
  z-index: 1;
}

.popup-content {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease;
  transform: scale(0.9);
  max-width: 50%;
}
.popup-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 1rem
}
.popup-text {
  margin-bottom: 1rem;
  margin-right: 1rem;
}

.popup-show .popup-content {
  transform: scale(1);
}

.close-button {
  position: relative;
  top: 0rem;
  left: 90%;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
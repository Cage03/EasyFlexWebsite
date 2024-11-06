<template>
  <div class="skill-modal">
    <UIInputField class="input" v-model="skillName" :type="'text'" :placeholder="'Category...'" />
    <div class="button-container">
      <UIButtonStandard :color="'white'" :content="'Cancel'" :action="closeModal" />
      <UIButtonStandard :color="'yellow'" :content="'Save'" :action="handleSave" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close']);
const useSkill = UseSkill();
const skillName = ref("");

const handleSave = async () => {
  try {
    await useSkill.createSkill({ name: skillName.value });
    
    window.confirm("Skill has successfully been added")
    closeModal();
  } catch (e: any) {
    window.alert("Something went wrong while creating a skill");
  }
};

const closeModal = () => {
  emit('close');
};
</script>

<style scoped lang="scss">
.skill-modal {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.625rem;
  box-shadow: var(--shadow-four-sides);
  z-index: 1001;
  background-color: #fff;
  border-radius:1rem;
  
  .button-container{
    display:flex;
    flex-direction: row;
    align-items:center;
    justify-content: space-between;
  }
}
</style>

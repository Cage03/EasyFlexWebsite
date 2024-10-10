<script setup lang="ts">

const props = defineProps({
  placeholder: String,
  modelValue: String,
  type: {
    type: String,
    default: 'text'
  },
  required: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <input :placeholder="placeholder" :type="type" :value="modelValue" @input="updateValue" :required="required">
</template>

<style scoped lang="scss">
input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-size: 1rem;
}
</style>
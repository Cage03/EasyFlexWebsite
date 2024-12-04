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
const inputRef = ref<HTMLInputElement | null>(null)

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

</script>

<template>
  <input ref="inputRef" :placeholder="placeholder" :type="type" :value="modelValue" @input="updateValue" :required="required">
</template>

<style scoped lang="scss">
input {
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-size: 1rem;
}
</style>
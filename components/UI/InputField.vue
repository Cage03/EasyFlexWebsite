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
  width: 100%;
  padding: var(--padding-small);
  border-radius: var(--border-radius-small);
  font-size: 1rem;
}
</style>
<template>
  <div class="list-item">
    <template v-for="property in properties">
      <p>{{property.value}}</p>
    </template>
    <UIIcon :icon="IconType.Edit" @click="redirectTo()"/>
  </div>
</template>

<script setup lang="ts">
import {IconType} from "~/types/global-types";

let props = defineProps({
  properties: {
    type: Array as () => Array<{ key: string; value: any }>,
    required: true
  },
  redirect: {
    type: String,
    required: false,
  }
});

const redirectTo = () => {
  const router = useRouter();

  if (props.redirect) {
    router.push(props.redirect);
  }
};
</script>

<style scoped lang="scss">

</style>
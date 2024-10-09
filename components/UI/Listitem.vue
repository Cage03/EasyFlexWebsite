<template>
  <div class="list-item">
    <div class="properties">
      <template v-for="property in properties">
        <p>{{ property.value }}</p>
      </template>
    </div>
    <UIIcon class="icon" :icon="IconType.Edit" @click="redirectTo()"/>
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
.list-item {
  position: relative;
  width: calc(100% - (4rem + 4px));
  padding: 0.5rem 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  border-radius: 1rem;
  border: 2px solid var(--text-primary-color);
  align-items: center;

  .properties {
    display: flex;
    flex-direction: row;
    gap:1rem;
    
    p {
      width:15rem;
      overflow:hidden;
      font-size: 1.5rem;
      font-weight: 700;
      font-family: Montserrat, sans-serif;
      text-overflow: ellipsis;
    }
  }

  .icon {
    margin-top: -0.5rem;
    cursor:pointer;
  }
}
</style>
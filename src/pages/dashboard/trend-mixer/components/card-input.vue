<template lang="pug">
.keyword(:style="{ backgroundColor: bgColor }")
  .keyword__area
    .keyword__color(:style="{ backgroundColor: chartColor }")
    input.keyword__input(v-model="keyword" placeholder="Enter a keyword" @input="$emit('search', keyword)")
  .keyword__actions
    q-icon.cursor-pointer(name="close" size="1.5em" @click="$emit('remove')")
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CardInput',
  emits: ['search', 'remove'],
  props: {
    bgColor: {
      type: String,
      default: '#f9ecff'
    },
    chartColor: {
      type: String,
      default: '#57007b'
    }
  },
  setup() {
    const keyword = ref('')
    return {
      keyword
    }
  }
})
</script>
<style lang="scss">
.keyword {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 8px;
  border: 1px solid #57007b;

  padding: 24px;

  &__area {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  &__color {
    display: flex;
    flex-shrink: 0;

    width: 8px;
    height: 8px;

    border-radius: 50%;
  }
  &__input {
    width: 100%;

    border: none;
    outline: none;
    background: transparent;

    color: black;

    font-size: 14px;
    font-weight: 400;
  }
}
</style>

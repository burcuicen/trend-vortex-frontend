<template lang="pug">
.t-loading
  .t-loading__spinner
    q-circular-progress(indeterminate
      size="59px"
      :thickness="1"
      color="grey-3"
      track-color="primary"
      class="q-ma-md")
  .t-loading__text Loading...
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TLoading'
})
</script>
<style lang="scss">
.t-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;

  // &__text {}

  // &__spinner {}
}
</style>

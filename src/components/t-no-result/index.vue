<template lang="pug">
.no-result.q-pt-xl
    q-img.no-result__asset(src="https://trend-vortex.s3.eu-north-1.amazonaws.com/fixing-bugs.svg" alt="wrong-bg" fit="contain")
    .no-result__subtitle Something went wrong. We're working tirelessly behind the scenes to fix this issue. Stay tuned for updates!
    q-btn.no-result__button(@click="refresh" color="primary") Refresh
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TNoResult',
  methods: {
    refresh() {
      window.location.reload()
    }
  }
})
</script>

<style lang="scss" scoped>
.no-result {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
  gap: 40px;

  &__title {
    font-size: 32px;
    font-weight: 700;
  }

  &__subtitle {
    font-size: 18px;
    font-weight: 400;
    max-width: 800px;
    text-align: center;
  }

  &__button {
    width: 200px;
  }
  &__asset {
    width: 50% !important;
    height: 50% !important;
  }
}
</style>

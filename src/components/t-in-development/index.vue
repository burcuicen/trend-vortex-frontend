<template lang="pug">
.development.q-pt-xl
  q-img.development__asset(src="https://trend-vortex.s3.eu-north-1.amazonaws.com/under-construction.svg" alt="landing-bg" position="absolute" top="0" left="0" width="100%" height="100%")
  .development__subtitle We're working tirelessly behind the scenes to bring you an exciting, enhanced online experience. Stay tuned for updates!
  q-btn.development__button(@click="$router.push({ name: 'Dashboard' })" color="primary") Back to Home
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TInDevelopment'
});
</script>

<style lang="scss" scoped>
.development {
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

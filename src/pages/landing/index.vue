<template lang="pug">
.page.page__landing
  .page__landing-banner
    landing-banner
  .page__landing-belt
    landing-belt
  .page__landing-banner
    landing-section
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LandingBanner from './components/banner.vue';
import LandingBelt from './components/belt.vue';
import LandingSection from './components/section.vue';

export default defineComponent({
  name: 'LandingPage',
  components: {
    LandingBanner,
    LandingBelt,
    LandingSection
  },
});
</script>
<style lang="scss" scoped></style>


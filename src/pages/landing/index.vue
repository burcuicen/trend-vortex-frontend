<template lang="pug">
.page.page__landing
  #home.page__landing-banner
    landing-banner
  #about.page__landing-belt
    landing-belt
  .page__landing-banner
    landing-section
  #contact.page__landing-contact
    landing-contact
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LandingBanner from './components/banner.vue';
import LandingBelt from './components/belt.vue';
import LandingSection from './components/section.vue';
import LandingContact from './components/contact.vue';

export default defineComponent({
  name: 'LandingPage',
  components: {
    LandingBanner,
    LandingBelt,
    LandingSection,
    LandingContact
  },
});
</script>
<style lang="scss" scoped></style>


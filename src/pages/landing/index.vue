<template lang="pug">
.page.page__landing
  landing-banner
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LandingBanner from './components/banner.vue';

export default defineComponent({
  name: 'LandingPage',
  components: {
    LandingBanner,
  },
});
</script>

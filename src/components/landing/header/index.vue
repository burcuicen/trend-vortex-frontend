<template lang="pug">
div
  DesktopHeader(v-if="!isMobile")
  MobileHeader(v-if="isMobile")
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DesktopHeader from './components/desktop-header.vue';
import MobileHeader from './components/mobile-header.vue';

export default defineComponent({
  name: 'LandingHeader',
  components: {
    DesktopHeader,
    MobileHeader,
  },
  data() {
    return {
      windowWidth: window.innerWidth,
    }
  },
  computed: {
    isMobile: function () {
      return this.windowWidth <= 768;
    },
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
});
</script>

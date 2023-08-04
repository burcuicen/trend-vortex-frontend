<template lang="pug">
.header
  .header__logo
    img(src="https://trend-vortex.s3.eu-north-1.amazonaws.com/logo.png" alt="logo" @click="scrollTo('home')")
  .header__menu
    .header__menu-item
      a(@click="scrollTo('home')") Home
    .header__menu-item
      a(@click="scrollTo('about')") About
    .header__menu-item
      a(@click="scrollTo('contact')") Contact
  .header__actions(v-if="!isLoggeddIn")
    router-link.header__actions-item.header__actions-item--login(:to="{name:'Login'}") Login
    router-link.header__actions-item.header__actions-item--register(:to="{name:'Register'}") Register
  .header__actions(v-else)
    q-icon.cursor-pointer(name="mdi-account-circle-outline" size="40px" color="primary" @click="isMenuOpen = !isMenuOpen")

QuickAccess(v-if="isMenuOpen" @close="isMenuOpen = false")

</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useAuthStore } from 'src/stores/auth';
import QuickAccess from './quick-access.vue';

export default defineComponent({
  name: 'DesktopHeader',
  components: {
    QuickAccess,
  },
  computed: {
    isLoggeddIn() {
      const authStore = useAuthStore();
      return authStore.isLoggedIn;
    },
  },
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    scrollTo(elementId) {
      const element = document.getElementById(elementId);

      if (element) element.scrollIntoView({ behavior: 'smooth' });
      else this.$router.push('/');
    }
  }
});
</script>
<style lang="scss"></style>

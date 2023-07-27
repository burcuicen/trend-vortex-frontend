<template lang="pug">
.header__mobile
  .header__mobile-container
    .header__logo
      img(src="https://trend-vortex.s3.eu-north-1.amazonaws.com/logo.png" alt="logo")
    .header__hamburger
      q-icon(name="mdi-menu" size="2rem" color="black" @click="toggleMenu")
  .header__menu.header__mobile-menu(v-if="isMenuOpen")
    .header__menu-item
      router-link(to="/") Home
    .header__menu-item
      a(@click="scrollTo('about')") About
    .header__menu-item
      a(@click="scrollTo('contact')") Contact
    .header__menu-item
      router-link(to="/") Blog
    .header__actions.header__mobile-actions(v-if="isMenuOpen")
      .header__actions-item.header__actions-item--login
        router-link(to="/") Login
      .header__actions-item.header__actions-item--register
        router-link(to="/") Register
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MobileHeader',
  data() {
    return {
      isMenuOpen: false,
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    scrollTo(elementId) {
      const element = document.getElementById(elementId);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },
});
</script>

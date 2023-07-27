<template lang="pug">
.header
  .header__logo
    img(src="/src/assets/logo.png" alt="logo")
  .header__menu
    .header__menu-item
      a(@click="scrollTo('home')") Home
    .header__menu-item
      a(@click="scrollTo('about')") About
    .header__menu-item
      a(@click="scrollTo('contact')") Contact
  .header__actions
    .header__actions-item.header__actions-item--login
      router-link(to="/login") Login
    .header__actions-item.header__actions-item--register
      router-link(to="/register") Register
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DesktopHeader',
  methods: {
    scrollTo(elementId) {
      const element = document.getElementById(elementId);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
});
</script>
<style lang="scss" scoped></style>

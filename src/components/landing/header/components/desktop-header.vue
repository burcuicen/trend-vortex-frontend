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
  .header__actions
    router-link.header__actions-item.header__actions-item--login(to="/login") Login
    router-link.header__actions-item.header__actions-item--register(to="/register") Register
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DesktopHeader',
  methods: {
    scrollTo(elementId) {
      const element = document.getElementById(elementId);

      if (element) element.scrollIntoView({ behavior: 'smooth' });
      else this.$router.push('/');
    }
  }
});
</script>
<style lang="scss" scoped></style>

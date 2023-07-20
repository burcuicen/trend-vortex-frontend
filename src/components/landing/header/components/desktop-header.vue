<template lang="pug">
.header
  .header__logo
    img(src="src/assets/logo.png" alt="logo")
  .header__menu
    .header__menu-item
      router-link(to="/") Home
    .header__menu-item
      router-link(to="/") About
    .header__menu-item
      router-link(to="/") Contact
    .header__menu-item
      router-link(to="/") Blog
  .header__actions
    .header__actions-item.header__actions-item--login
      router-link(to="/") Login
    .header__actions-item.header__actions-item--register
      router-link(to="/") Register
    </template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DesktopHeader',
});
</script>
<style lang="scss" scoped></style>

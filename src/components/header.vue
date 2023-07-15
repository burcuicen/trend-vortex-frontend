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
  name: 'LandingHeader',
});
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 10px 25px;
  background-color: #fff;
  box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.10);
  flex-wrap: wrap;

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__menu {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;

    &-item {
      font-family: 'Lato', sans-serif;
      font-size: 16px;
      font-weight: 500;
      line-height: 156.25%;

      a {
        text-decoration: none;
        color: #000;
      }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;

    &-item {
      cursor: pointer;
      font-family: 'Lato', sans-serif;
      font-size: 16px;
      font-weight: 500;
      line-height: 156.25%;

      &--register {
        display: flex;
        color: #FAFAFA;
        padding: 14px 25px;
        background: linear-gradient(225deg, #F76680 0%, #57007b 100%);
        font-size: 14px;
        font-weight: 600;
        line-height: 14px;
        border-radius: 5px;


        a {
          text-decoration: none;
          color: #FAFAFA !important;
        }
      }

      a {
        text-decoration: none;
        color: #000;
      }
    }
  }
}
</style>

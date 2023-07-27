<template lang="pug">
.footer
  .footer__contents
    .footer__logo
      img(src="https://trend-vortex.s3.eu-north-1.amazonaws.com/logo.png" alt="logo")
    .footer__socials
      q-icon.footer__socials-item(name="mdi-github" size="2rem" color="primary")
      q-icon.footer__socials-item(name="mdi-linkedin" size="2rem" color="primary")
      q-icon.footer__socials-item(name="mdi-instagram" size="2rem" color="primary")
    .footer__menu
      .footer__menu-item
        router-link(to="/") Home
      .footer__menu-item
        router-link(to="/") About
      .footer__menu-item
        router-link(to="/") Contact
      .footer__menu-item
        router-link(to="/") Blog
.footer__copyright
  div © Designed and developed by <a href="https://github.com/burcuicen">Burcu İçen</a>
  </template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LandingFooter'
});
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: space-between;
  height: 265px;
  padding: 10px 25px;
  background-color: #F9F9FF;
  border-top: 1px solid #E5E5E5;
  flex-wrap: wrap;

  &__socials {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;

    &-item {
      cursor: pointer;
    }
  }

  &__copyright {
    position: absolute;
    padding: 20px;
    width: 100%;
    text-align: center;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 156.25%;
    color: #E5E5E5;
    background: #57007b;

    a {
      text-decoration: none;
      color: #E5E5E5;
    }
  }

  &__contents {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    gap: 40px;
    padding-bottom: 30px;
    padding-top: 30px;
  }

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

}
</style>

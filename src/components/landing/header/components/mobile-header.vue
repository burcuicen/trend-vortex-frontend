<template lang="pug">
.header__mobile
  .header__mobile-container
    .header__logo
      img(src="src/assets/logo.png" alt="logo")
    .header__hamburger
      q-icon(name="menu" size="2rem" color="#000" @click="toggleMenu")
  .header__menu.header__mobile-menu(v-if="isMenuOpen")
    .header__menu-item
      router-link(to="/") Home
    .header__menu-item
      router-link(to="/") About
    .header__menu-item
      router-link(to="/") Contact
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
  },
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

  &__mobile {
    &-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      border: 1px solid #E5E5E5;
    }

    &-menu {
      display: flex;
      flex-direction: column;
      padding: 16px;
      background-color: #FAFAFA;
      border: 1px solid #E5E5E5;
      gap: 20px;
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

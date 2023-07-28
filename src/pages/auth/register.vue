<template lang="pug">
.register
  .register__form.form
    .form__header
      .form__header-pretitle Welcome !
      .form__header-title Sign up to
      .form__header-subtitle Trend Vortex Web App
    .form__body
      .form__group
        label.form__label(for="email") Email
        input.form__input(type="email" id="email" placeholder="Enter your email")
      .form__group
        label.form__label(for="username") Username
        input.form__input(type="text" id="username" placeholder="Enter your user name")
      .form__group
        label.form__label(for="password") Password
        input.form__input(type="password" id="password" placeholder="Enter your password")
      .form__group
        label.form__label(for="password") Confirm Password
        input.form__input(type="password" id="password" placeholder="Enter your password")
      .form__group
        button.form__button(type="submit") Register
    .form__footer
      .form__footer-text Already have an account?
      router-link.form__footer-link(to="/login") Login
  .register__asset
    q-img(src="https://trend-vortex.s3.eu-north-1.amazonaws.com/register.svg" alt="Register")
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RegisterPage'
});
</script>
<style lang="scss" scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 41px;

  padding-top: 33px;
  padding-bottom: 54px;

  &__form {
    display: flex;
    flex-direction: column;

    gap: 20px;

    padding: 14px 47px 25px 35px;

    width: 505px;

    background-color: $white;

    border-radius: 10px;
    border: 0.5px solid #878787;
    box-shadow: 0px 4px 64px 0px rgba(0, 0, 0, 0.05);

    @media (max-width: 768px) {
      padding: 25px 24px 21px 23px;
      width: 90%;
      gap: 30px;
    }
  }

  &__asset {
    height: 600px;
    width: 600px;

    @media (max-width: 768px) {
      display: none;
    }
  }
}
</style>

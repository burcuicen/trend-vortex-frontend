<template lang="pug">
.contact
  .contact__form
    .contact__form-header
      .contact__form-title
        | Get in touch
      .contact__form-subtitle
        | We are here to help. Get in touch with us. We will respond as soon as we can.
    form.contact__form-form.form(@submit.prevent="submitForm")
      .form__group
        label.form__group-label(for="name") Name
        input.form__group-input(type="text" id="name" placeholder="Enter your name" v-model="name")
      .form__group
        label.form__group-label(for="email") Email
        input.form__group-input(type="email" id="email" placeholder="Enter your email address" v-model="email")
      .form__group
        label.form__group-label(for="message") Message
        textarea.form__group-textarea(id="message" placeholder="Go ahead, We are listening..." v-model="message")
      .form__group
        button.form__group-button.btn.btn--primary(type="submit") Submit
  .contact__asset
    img(src="/src/pages/landing/assets/contact-asset.png" alt="contact")
    .contact__socials
      .contact__socials-item
        q-icon.contact__socials-icon(name="mdi-github" size="1.5rem" color="white")
        span https://github.com/burcuicen
      .contact__socials-item
        q-icon.contact__socials-icon(name="mdi-email-outline" size="1.5rem" color="white")
        span burcuicen2000@gmail.com
      .contact__socials-item
        q-icon.contact__socials-icon(name="mdi-map-marker" size="1.5rem" color="white")
        span Muğla, Turkey

</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LandingContact',
  data() {
    return {
      name: '',
      email: '',
      message: ''
    }
  },
  methods: {
    submitForm() {
      console.log(this.name, this.email, this.message);
      this.name = '';
      this.email = '';
      this.message = '';
    }
  }
});
</script>
<style lang="scss" scoped>
.contact {
  display: flex;
  justify-content: center;
  gap: 100px;

  width: 100%;

  background: #F9F9FF;

  padding: 80px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 50px;

    padding: 40px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &-header {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 7px;
    }

    &-title {
      font-size: 35px;
      font-weight: 400;

      color: #1A202C;
      line-height: 55px;
    }

    &-subtitle {
      font-size: 18px;
      font-weight: 400;

      color: #718096;
    }

    &-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form {
      &__group {
        display: flex;
        flex-direction: column;
        gap: 5px;

        &-label {
          font-size: 16px;
          font-weight: 400;

          color: $primary;
        }

        &-input,
        &-textarea {
          padding: 10px;

          border: 1px solid #E2E8F0;

          border-radius: 5px;

          font-size: 14px;
          font-weight: 400;

          color: #4A5568;

          outline: none;
          resize: none;
        }

        &-textarea {
          height: 100px;
        }
      }
    }
  }

  &__asset {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  &__socials {
    display: flex;
    flex-direction: column;
    gap: 24px;

    &-icon {
      cursor: pointer;

      padding: 6px;

      background-color: $primary;

      border-radius: 50%;
    }

    &-item {
      display: flex;
      align-items: center;
      gap: 10px;

      font-size: 14px;
      font-weight: 400;
    }
  }
}
</style>

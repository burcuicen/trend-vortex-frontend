<template lang="pug">
.section
  .section__content
    .section__title
      .section__title--light  Unveiling Global Trends
      .section__title--bold with
        | &nbsp;
        span Trend Vortex
    .section__description Trend Vortex, the ultimate platform for uncovering real-time trends and gaining valuable insights into the pulse of the moment. With our powerful data analytics and intuitive user interface, staying up-to-date with the latest trends has never been easier.

    .section__cta
      button.btn.btn--solid.btn--md See more information
        q-icon.btn__icon(name="keyboard_arrow_right" size="24px" color="primary")

  .section__image
    img(src="src/pages/landing/assets/about-1.png" alt="banner")

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LandingSection',
});
</script>
<style lang="scss" scoped>
.section {
  display: flex;
  align-items: center;
  gap: 50px;

  //at mobile
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 20px;
  }

  &__image {
    @media (max-width: 768px) {
      img {
        width: 350px;
      }
    }
  }


  &__content {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  &__title {
    font-size: 35px;
    line-height: 55px;
    color: #1A202C;

    @media (max-width: 768px) {
      font-size: 30px;
      line-height: 50px;
    }

    &--light {
      font-weight: 400;

    }

    &--bold {
      font-weight: 700;

      span {
        color: #57007B;
      }
    }
  }

  &__description {
    color: #718096;
    font-size: 18px;
    font-weight: 400;
    line-height: 36px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      line-height: 35px;
    }
  }
}
</style>

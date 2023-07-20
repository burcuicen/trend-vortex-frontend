<template lang="pug">
.banner
  .banner__content
    .banner__title
      .banner__title--light
        span Uncover
        | &nbsp;
        span Live
        | &nbsp;
        span Trends
      .banner__title--bold with
        | &nbsp;
        span Trend Vortex
    .banner__description Stay up-to-date with the latest global trends, gain real-time insights across various industries and topics, and harness the power of data-driven decision-making with Trend Vortex.

    .banner__cta
      button.btn.btn--primary.btn--md Let’s get started!

  .banner__image
    img(src="src/pages/landing/assets/banner-img.png" alt="banner")

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LandingBanner',
});
</script>
<style lang="scss" scoped>
.banner {
  display: flex;
  align-items: center;
  gap: 40px;

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
    gap: 20px;
  }

  &__title {
    font-size: 45px;
    line-height: 71px;

    @media (max-width: 768px) {
      font-size: 30px;
      line-height: 50px;
    }

    &--light {
      font-weight: 300;

      span {
        &:nth-child(2) {
          color: #57007B;
        }
      }

    }

    &--bold {
      font-weight: 700;

      span {
        color: #57007B;
      }
    }
  }

  &__description {
    color: #4A5568;
    font-size: 18px;
    font-weight: 400;
    line-height: 200%;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      line-height: 35px;
    }
  }
}
</style>

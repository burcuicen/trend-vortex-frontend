<template lang="pug">
.section
  .section__image
    img(src="src/pages/landing/assets/about.png" alt="banner")
  .section__content
    .section__title
      .section__title--light
        span Unleash the Power of
      .section__title--bold Data-Driven
        | &nbsp;
        span Insights
    .section__description At Trend Vortex, we believe that data holds the key to unlocking endless possibilities. Our platform empowers individuals and businesses with real-time access to global trends, enabling them to make data-driven decisions and stay at the forefront of innovation. With a passion for exploration and discovery, we provide a seamless experience for uncovering valuable insights and seizing opportunities in today's ever-changing world. Join us on this exhilarating journey and harness the potential of data to shape a brighter future.

    .section__cta
      button.btn.btn--outline.btn--md Explore Trends Now

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LandingBanner',
});
</script>
<style lang="scss" scoped>
.section {
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

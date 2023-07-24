<template lang="pug">
.belt
  .belt__title Discover the Power of Trend Vortex
  .belt__cards
    landing-belt-card(:card="card" v-for="card in cards" :key="card.title")

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LandingBeltCard from './card.vue';


export default defineComponent({
  name: 'LandingBelt',
  components: {
    LandingBeltCard
  },
  data() {
    return {
      cards: [
        {
          title: 'Real-Time Insights',
          description: 'Stay ahead of the curve with real-time data and gain valuable insights into the latest trends and topics.',
          icon: 'mdi-trending-up'
        },
        {
          title: 'Global Coverage',
          description: 'Explore trends from around the world with our extensive geographic coverage and access data from various regions.',
          icon: 'mdi-earth'
        },
        {
          title: 'User-Friendly Interface',
          description: 'Experience a seamless user interface that makes it easy to navigate through trends and discover relevant information.',
          icon: 'mdi-laptop'
        },
        {
          title: 'Discover Emerging Trends',
          description: 'Explore and discover emerging trends to capitalize on new opportunities and stay competitive.',
          icon: 'mdi-ski-cross-country'
        },
        {
          title: 'Trend Analysis Tools',
          description: 'Utilize powerful trend analysis tools to gain deeper insights into market trends and customer behavior.',
          icon: 'mdi-google-analytics'
        },
        {
          title: 'Actionable Analytics',
          description: 'Get actionable insights from data analytics to optimize your strategies and drive business growth.',
          icon: 'mdi-home-analytics'
        }

      ]
    }
  }
});
</script>
<style lang="scss" scoped>
.belt {
  display: flex;
  flex-direction: column;
  gap: 73px;
  background: #F9F9FF;
  padding: 46px 113px;

  @media (max-width: 768px) {
    padding: 16px;
    gap: 40px;

  }

  &__cards {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 40px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 20px;
    }
  }

  &__title {
    color: #1A202C;
    font-size: 35px;
    font-weight: 300;
    line-height: 55px;
    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
      text-align: center;
      font-size: 28px;
    }
  }
}
</style>

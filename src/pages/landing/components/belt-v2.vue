<template lang="pug">
.belt
  .belt__title Discover the Power of Trend Vortex
  .belt__swiper
    swiper(:slidesPerView="4" :spaceBetween="20" :freeMode="true"  :pagination= "{ clickable: true }" :modules="modules")
      swiper-slide(v-for="card in cards" :key="card.title")
        landing-belt-card(:card="card")
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LandingBeltCard from './card.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/pagination';


export default defineComponent({
  name: 'LandingBelt',
  components: {
    LandingBeltCard,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      cards: [
        {
          title: 'Real-Time Insights',
          description: 'Stay ahead of the curve with real-time data and gain valuable insights into the latest trends and topics.',
          icon: 'trending_up'
        },
        {
          title: 'Global Coverage',
          description: 'Explore trends from around the world with our extensive geographic coverage and access data from various regions.',
          icon: 'travel_explore'
        },
        {
          title: 'User-Friendly Interface',
          description: 'Experience a seamless user interface that makes it easy to navigate through trends and discover relevant information.',
          icon: 'laptop_chromebook'
        },
        {
          title: 'User-Friendly Interface',
          description: 'Experience a seamless user interface that makes it easy to navigate through trends and discover relevant information.',
          icon: 'laptop_chromebook'
        },
        {
          title: 'User-Friendly Interface',
          description: 'Experience a seamless user interface that makes it easy to navigate through trends and discover relevant information.',
          icon: 'laptop_chromebook'
        }

      ],
      modules: [Pagination]
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

  &__cards {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 40px;
  }

  &__title {
    color: var(--gray-gray-900, #1A202C);
    font-size: 35px;
    font-weight: 700;
    line-height: 55px;
    display: flex;
    justify-content: center;
  }
}
</style>

<template lang="pug">
.top-card
  .top-card__score
    .top-card__score-circle
  .top-card__content
    .top-card__content-title {{ card.title }}
    .top-card__content-subtitle {{ card.type }}
    .top-card__content-badge {{ getBadgeContent(card) }}
  .top-card__actions
</template>
<script lang="ts">
import { defineComponent } from 'vue'

interface CardItemProps {
  formattedValue: string
  link: string
  value: number
  score: number
  title: string
  type: string
}

export default defineComponent({
  name: 'TopResultCard',
  props: {
    card: {
      type: Object as () => CardItemProps,
      required: true
    }
  },
  setup() {
    const scoreColorMap = {
      '70-100': {
        color: '#62C275',
        bg: '#E9F0D2'
      },
      '50-69': {
        color: '#FFDE54',
        bg: '#FCF4D2'
      },
      '30-49': {
        color: '#5E96D8',
        bg: '#E5EAEF'
      },
      '0-29': {
        color: '#DE665A',
        bg: '#FFE7E4'
      }
    }
    function getCardStyles(score: number) {
      //TODO: return the correct color and bg color based on the score
    }
    function getBadgeContent(card: CardItemProps) {
      //TODO: return the correct badge content based on the card type
      const score = card.score
      //const formattedValue = card.formattedValue

      if (score >= 70) return 'Popular'
      else if (score >= 50) return 'Trending'
      else if (score >= 30) return 'Average'
      else return 'Normal'
    }
    return {
      getBadgeContent,
      getCardStyles
    }
  }
})
</script>
<style lang="scss">
.top-card {
  --color: #000;
  --bg: #efefef;
  max-width: 300px;

  display: flex;
  gap: 16px;
  align-items: flex-start;

  padding: 20px;
  border-radius: 12px;

  background-color: var(--bg);
  color: var(--color);

  &__score {
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &-title {
      color: #000;

      font-size: 16px;
      font-weight: 700;
    }
    &-subtitle {
      color: #272727;

      font-size: 12px;
      font-weight: 500;
    }
    &-badge {
      --badge-color: white;
      --badge-bg: purple;
      color: var(--badge-color);

      background-color: var(--badge-bg);
      border-radius: 8px;

      width: 80px;

      padding: 5px;

      font-size: 12px;
      font-weight: 500;

      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
  }
  &__actions {
  }
}
</style>

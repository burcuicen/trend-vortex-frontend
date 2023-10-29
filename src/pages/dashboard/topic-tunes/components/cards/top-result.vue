<template lang="pug">
.top-card(:style="getCardStyles(card.score)")
  .top-card__container
    .top-card__score
      q-circular-progress(:angle="90" :value="card.score" size="63px" :thickness="0.15" :color="getCardChartColor(card.score)" track-color="white" class="q-ma-md" show-value)
        | {{ card.score  }}%
    .top-card__content
      .top-card__content-title {{ card.title }}
      .top-card__content-subtitle {{ card.type }}
      .top-card__content-badge(:style="getBadgeStyles()") {{ getBadgeContent(card) }}
  .top-card__actions
   .top-card__action(@click="openLinkInNewTab(card.link)")
      q-icon(name="open_in_new" size="xs" color="black")
   .top-card__action(@click="copyToClipboard(card.title)")
      q-icon(name="content_copy" size="xs" color="black")
</template>
<script lang="ts">
import { useQuasar } from 'quasar'
import { computed, defineComponent } from 'vue'

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
  setup(props) {
    const $q = useQuasar()

    const scoreColorMap = {
      '70-100': {
        color: '#62C275',
        bg: '#E9F0D2'
      },
      '50-69': {
        color: '#FF7527',
        bg: '#FFE6D8'
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
    const scoreInterval = computed(() => {
      const score = props.card.score
      return score >= 70 ? '70-100' : score >= 50 ? '50-69' : score >= 30 ? '30-49' : '0-29'
    })
    function getCardChartColor() {
      const { color } = scoreColorMap[scoreInterval.value]
      return color
    }
    function getCardStyles() {
      const { color, bg } = scoreColorMap[scoreInterval.value]
      return {
        '--color': color,
        '--bg': bg
      }
    }
    function getBadgeStyles() {
      const { color, bg } = scoreColorMap[scoreInterval.value]
      return {
        '--badge-color': 'white',
        '--badge-bg': color
      }
    }
    function copyToClipboard(text: string) {
      navigator.clipboard.writeText(text)
      $q.notify({
        message: 'Copied to clipboard',
        color: 'primary',
        icon: 'done'
      })
    }
    function openLinkInNewTab(link: string) {
      const googleTrendsLink = 'https://trends.google.com'
      window.open(googleTrendsLink + link, '_blank')
    }
    function getBadgeContent(card: CardItemProps) {
      const score = card.score

      if (score >= 70) return 'Popular '
      else if (score >= 50) return 'Trending'
      else if (score >= 30) return 'Average '
      else return 'Unpopular '
    }
    return {
      getBadgeContent,
      getCardStyles,
      getCardChartColor,
      getBadgeStyles,
      copyToClipboard,
      openLinkInNewTab
    }
  }
})
</script>
<style lang="scss">
.top-card {
  --color: #000;
  --bg: #efefef;
  //max-width: 300px;

  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;

  padding: 20px;
  border-radius: 12px;

  background-color: var(--bg);
  color: var(--color);
  &__container {
    display: flex;
    gap: 16px;

  }

  &__score {
    .q-circular-progress__text {
      font-size: 16px;
      font-weight: 700;
      color: black;
    }
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
    display: flex;
    align-items: flex-end;
    gap: 12px;
  }
  &__action {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 1px solid #000;
    padding: 5px;
  }
}
</style>

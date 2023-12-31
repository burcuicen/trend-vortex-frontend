<template lang="pug">
.q-pa-md.page.page--category
    THeader(
      title="Topic Tunes"
      content="Enter a keyword to explore the category trends"
    )
    .page__content.row.q-col-gutter-sm
      .col-12
        TKeywordForm(@search="getData")
      .col-12
        TLoading(v-if="loading")
        TNoResult(v-else-if="!loading && errorOccurred")
        .page__results(v-if = "preparedData.length && !loading && !errorOccurred")
          .row.q-col-gutter-sm
            .col-12.col-md-3(v-for="card in topData")
              TopResultCard(:card="card")
          .row.q-col-gutter-sm.q-mt-md
            .col-12.col-md-3.q-mb-md(v-for="card in preparedData")
                  TopResultCard(:card="card")
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import THeader from 'src/pages/dashboard/components/header.vue'
import TNoResult from 'src/components/t-no-result/index.vue'
import TLoading from 'src/components/t-loading/index.vue'
import TChart from 'src/components/t-chart/index.vue'
import TKeywordForm from 'src/components/t-keyword-form/index.vue'
import TopResultCard from './components/cards/top-result.vue'

import { api } from 'src/plugins'
import { useQuasar } from 'quasar'
import { TChartDataItem } from 'src/components/t-chart/types'

export default defineComponent({
  name: 'TopicTunesPage',
  components: {
    THeader,
    TKeywordForm,
    TNoResult,
    TLoading,
    TopResultCard,
    TChart
  },
  setup() {

    const loading = ref(false)
    const errorOccurred = ref(false)

    const keyword = ref('')

    const rawData = ref(null)

    const preparedData = ref([])
    const topData = computed(() => preparedData.value.slice(0, 4))

    const chartData = ref<TChartDataItem[]>([])

    const topicsChartDataPops = {
      chartId: 'topic-chart',
      title: 'Top Topics',
      pieLabel: 'Search Volume',
      dataLimit: 50
    }
    async function getData(query: { keyword: string }) {
      const $q = useQuasar()

      loading.value = true
      errorOccurred.value = false

      const { err, res } = await api.googleTrends.fetchRelatedTopics(query)

      if (err) {
        loading.value = false
        errorOccurred.value = true
        $q.notify({
          color: 'negative',
          message: err.message
        })
      } else {
        keyword.value = query.keyword
        rawData.value = res.data
        prepareData()
        loading.value = false
      }
    }

    function getVortexScore(value: number, type: 'breakout' | 'trending', minVal = 0, maxVal = 100): number {
      if (type === 'trending') {
        return Math.round(1 + ((value - minVal) * (50 - 1)) / (maxVal - minVal))
      }
      return Math.round(51 + ((value - minVal) * (99 - 51)) / (maxVal - minVal))
    }

    function mapToPreparedData(item: any, type: 'breakout' | 'trending', minVal = 0, maxVal = 100) {
      return {
        formattedValue: item.formattedValue,
        link: item.link,
        value: item.value,
        title: item.topic.title,
        type: item.topic.type,
        score: getVortexScore(item.value, type, minVal, maxVal)
      }
    }

    function prepareData() {
      const [trending, breakout] = rawData.value.default.rankedList.map(list => list.rankedKeyword)

      const minVal = Math.min(...breakout.map(item => item.value))
      const maxVal = Math.max(...breakout.map(item => item.value))

      const trendingData = trending.map(item => mapToPreparedData(item, 'trending'))
      const breakoutData = breakout.map(item => mapToPreparedData(item, 'breakout', minVal, maxVal))
      preparedData.value = trendingData.concat(breakoutData).sort((a, b) => b.score - a.score)
      prepareChartData()
    }
    function prepareChartData() {
      preparedData.value.forEach(item => {
        chartData.value.push({
          name: item.title,
          value: item.value
        })
      })
    }

    return {
      loading,
      errorOccurred,
      getData,
      preparedData,
      topData,
      chartData,
      topicsChartDataPops
    }
  }
})
</script>

<style lang="scss" scoped></style>

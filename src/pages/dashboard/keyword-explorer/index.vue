<template lang="pug">
.q-pa-md.page.page--regional
    THeader(
      title="Keyword Explorer"
      content="Enter a keyword and find related keywords"
    )
    .page__content.row.q-col-gutter-sm
      .col-12
        TKeywordForm(@search="getData")
      .col-12
        .page__results
          TLoading(v-if="loading")
          TChart(v-else-if="!loading && chartData.length" v-bind="keywordChartProps" :data="chartData")
          TNoResult(v-else-if="!loading && errorOccurred")
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { api } from 'src/plugins'
import { useQuasar } from 'quasar'

import TInDevelopment from 'src/components/t-in-development/index.vue'
import THeader from 'src/pages/dashboard/components/header.vue'
import TChart from 'src/components/t-chart/index.vue'

import TLoading from 'src/components/t-loading/index.vue'
import TNoResult from 'src/components/t-no-result/index.vue'
import TKeywordForm from 'src/components/t-keyword-form/index.vue'
import { TChartDataItem } from 'src/components/t-chart/constants'

export default defineComponent({
  name: 'KeywordExplorerPage',
  components: {
    TInDevelopment,
    THeader,
    TLoading,
    TNoResult,
    TKeywordForm,
    TChart
  },
  setup() {
    const $q = useQuasar()

    const loading = ref(false)
    const errorOccurred = ref(false)

    const rawData = ref(null)
    const relatedKeywordData = ref([])
    const relatedTopicsRawData = ref(null)

    const chartData = ref<TChartDataItem[]>([])
    const keywordChartProps = {
      chartId: 'keyword-chart',
      title: 'Search Interest by Query',
      pieLabel: 'Search Volume',
      dataLimit: 50
    }

    async function getData(query: { keyword: string }) {
      loading.value = true
      errorOccurred.value = false

      const { err, res } = await api.googleTrends.fetchRelatedQueries(query)

      if (err) {
        loading.value = false
        errorOccurred.value = true
        $q.notify({
          color: 'negative',
          message: err.message
        })
      } else {
        rawData.value = res.data
        prepareData()
        loading.value = false
      }
    }
    async function getRelatedTopics(query: { keyword: string }) {
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
        relatedTopicsRawData.value = res.data
        prepareRelatedTopicsData()
        loading.value = false
      }
    }
    function prepareRelatedTopicsData() {
      //TODO: prepare data
    }

    function prepareData() {
      const rankedKeyword1 = rawData.value.default.rankedList[0].rankedKeyword
      const rankedKeyword2 = rawData.value.default.rankedList[1].rankedKeyword
      const combinedRankedKeyword = [...rankedKeyword1, ...rankedKeyword2]
      const relatedKeywords = combinedRankedKeyword
        .map((item: any) => {
          return {
            name: item.query,
            value: item.value
          }
        })
        .sort((a: any, b: any) => b.value - a.value)
      relatedKeywordData.value = relatedKeywords
      chartData.value = relatedKeywords
    }
    return {
      getData,
      loading,
      rawData,
      errorOccurred,
      relatedKeywordData,
      keywordChartProps,
      chartData
    }
  }
})
</script>

<style lang="scss" scoped></style>

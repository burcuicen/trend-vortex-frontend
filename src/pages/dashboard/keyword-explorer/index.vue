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
        TLoading(v-if="loading")
        TNoResult(v-else-if="!loading && errorOccurred")
        .page__results(v-if = "relatedKeywordData.length && !loading && !errorOccurred")
          q-tabs(v-model="selectedTab" active-color="white" indicator-color="primary" active-bg-color="primary" align="justify")
            q-tab(name="chart" label="Chart View")
            q-tab(name="list" label="List View")
          q-tab-panels(v-model="selectedTab" animated)
            q-tab-panel(name="chart")
              TChart(v-if="!loading && chartData.length" v-bind="keywordChartProps" :data="chartData")
            q-tab-panel(name="list")
              TKeywordList(:data="relatedKeywordData" splitDataByType)
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { api } from 'src/plugins'
import { useQuasar } from 'quasar'

import { TChartDataItem } from 'src/components/t-chart/constants'

import TInDevelopment from 'src/components/t-in-development/index.vue'
import THeader from 'src/pages/dashboard/components/header.vue'
import TChart from 'src/components/t-chart/index.vue'
import TLoading from 'src/components/t-loading/index.vue'
import TNoResult from 'src/components/t-no-result/index.vue'
import TKeywordForm from 'src/components/t-keyword-form/index.vue'
import TKeywordList from 'src/components/t-keyword-list/index.vue'

export default defineComponent({
  name: 'KeywordExplorerPage',
  components: {
    TInDevelopment,
    THeader,
    TLoading,
    TNoResult,
    TKeywordForm,
    TChart,
    TKeywordList
  },
  setup() {
    const $q = useQuasar()

    const loading = ref(false)
    const errorOccurred = ref(false)

    const rawData = ref(null)
    const relatedKeywordData = ref([])

    const chartData = ref<TChartDataItem[]>([])

    const keywordChartProps = {
      chartId: 'keyword-chart',
      title: 'Search Interest by Query',
      pieLabel: 'Search Volume',
      dataLimit: 50
    }

    const selectedTab = ref('chart')

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

    function prepareData() {
      const rankedKeyword1 = rawData.value.default.rankedList[0].rankedKeyword
      const rankedKeyword2 = rawData.value.default.rankedList[1].rankedKeyword
      const combinedRankedKeyword = [...rankedKeyword1, ...rankedKeyword2]
      const relatedKeywords = combinedRankedKeyword
        .map((item: any) => {
          return {
            name: item.query,
            value: item.value,
            featured: item.formattedValue === 'Breakout' ? true : false
          }
        })
        .sort((a: any, b: any) => b.value - a.value)
      relatedKeywordData.value = prepareRelatedKeywordData(relatedKeywords)
      chartData.value = relatedKeywords
    }
    function prepareRelatedKeywordData(relatedKeywords) {
      return relatedKeywords.map(item => {
        return {
          name: item.name,
          value: item.value,
          featured: item.featured,
          link: `https://www.google.com/search?q=${item.name}`
        }
      })
    }
    return {
      getData,
      loading,
      rawData,
      errorOccurred,
      relatedKeywordData,
      keywordChartProps,
      chartData,
      selectedTab
    }
  }
})
</script>

<style lang="scss" scoped></style>

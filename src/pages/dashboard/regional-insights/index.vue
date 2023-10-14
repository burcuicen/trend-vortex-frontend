<template lang="pug">
.q-pa-md.page.page--regional
  THeader(
    title="Regional Insights"
    content="Get insights on how your keywords are performing in different regions."
  )
  .page__content.row.q-col-gutter-sm
    .col-12
      TKeywordForm(@search="getData")
    .col-12
      TLoading(v-if="loading")
      TNoResult(v-else-if="!loading && errorOccurred")
      .page__results(v-if = "chartData.length && !loading && !errorOccurred")
        q-tabs(v-model="selectedTab" active-color="white" indicator-color="primary" active-bg-color="primary" align="justify")
            q-tab(name="chart" label="Chart View")
            q-tab(name="list" label="List View")
        q-tab-panels(v-model="selectedTab" animated)
            q-tab-panel(name="chart")
              TChart(v-if="!loading && chartData.length" v-bind="regionalChartProps" :data="chartData")
            q-tab-panel(name="list")
              TKeywordList(:data="keywordData" title="Top Regions")
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
import TKeywordList from 'src/components/t-keyword-list/index.vue'

import { GeoMapDataItem, TChartDataItem } from 'src/components/t-chart/types'
import { KeywordCardItemProps } from 'src/components/t-keyword-list/types'
export default defineComponent({
  name: 'RegionalInsightsPage',
  components: {
    TInDevelopment,
    THeader,
    TLoading,
    TChart,
    TNoResult,
    TKeywordForm,
    TKeywordList
  },
  setup() {
    const $q = useQuasar()

    const loading = ref(false)
    const errorOccurred = ref(false)

    const selectedTab = ref('chart')

    const rawData = ref(null)
    const chartData = ref<TChartDataItem[]>([])

    const keywordData = ref<KeywordCardItemProps[]>([])

    const regionalChartProps = {
      chartId: 'regional-chart',
      title: 'Search Interest by Country',
      pieLabel: 'Search Volume'
    }
    async function getData(query: { keyword: string }) {
      loading.value = true
      errorOccurred.value = false

      const { err, res } = await api.googleTrends.fetchInterestByRegion(query)

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
      chartData.value = []

      const raw = rawData.value?.default?.geoMapData
      if (!raw) return (chartData.value = [])

      raw.forEach((item: GeoMapDataItem) => {
        chartData.value.push({
          name: item.geoName,
          value: item.value[0]
        })
      })
      prepareKeywordData()
    }
    function prepareKeywordData() {
      chartData.value = chartData.value.sort((a, b) => b.value - a.value)
      keywordData.value = []
      chartData.value.forEach((item, index) => {
        keywordData.value.push({
          name: item.name,
          value: item.value,
          link: `https://www.google.com/search?q=${item.name}`
        })
      })
    }
    return {
      getData,
      loading,
      rawData,
      chartData,
      regionalChartProps,
      errorOccurred,
      selectedTab,
      keywordData
    }
  }
})
</script>

<style lang="scss" scoped></style>

<template lang="pug">
.q-pa-md.page.page--trends
  THeader(
    title="Trends Over Time"
    content="Get insights on how your keywords are performing over time."
  )
  .page__content.row.q-col-gutter-sm
    .col-12
      TKeywordForm(@search="getData")
    .col-12
      TLoading(v-if="loading")
      TNoResult(v-else-if="!loading && errorOccurred")
      .page__results(v-if = "chartData.length && !loading && !errorOccurred")
        TChart(v-if="!loading && chartData.length" v-bind="timelineChartProps" :data="chartData" :keyword="keyword")
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import THeader from 'src/pages/dashboard/components/header.vue'
import TChart from 'src/components/t-chart/index.vue'
import TLoading from 'src/components/t-loading/index.vue'
import TNoResult from 'src/components/t-no-result/index.vue'
import TKeywordForm from 'src/components/t-keyword-form/index.vue'

import { useQuasar } from 'quasar'
import { api } from 'src/plugins'
import { TChartDataItem } from 'src/components/t-chart/constants'

export default defineComponent({
  name: 'TrendsOverTimePage',
  components: {
    THeader,
    TLoading,
    TChart,
    TNoResult,
    TKeywordForm
  },
  setup() {
    const $q = useQuasar()

    const loading = ref(false)
    const errorOccurred = ref(false)

    const rawData = ref(null)
    const timelineData = ref([])
    const keyword = ref('')

    const chartData = ref<TChartDataItem[]>([])
    const timelineChartProps = {
      chartId: 'timeline-chart',
      title: 'Trends Over Time',
      pieLabel: 'Search Volume',
      showTimeLimit: true,
      disabledChartTypes: ['pie', 'doughnut'],
      defaultSelectedChartType: 'line'
    }

    async function getData(query: { keyword: string }) {
      loading.value = true
      errorOccurred.value = false

      const { err, res } = await api.googleTrends.fetchInterestOverTime(query)

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
    function prepareData() {
      const timelineData = rawData.value?.default?.timelineData.map((item: any) => {
        return {
          name: item.formattedTime,
          value: item.value[0]
        }
      })
      chartData.value = timelineData
    }

    return {
      loading,
      errorOccurred,
      timelineData,
      getData,
      timelineChartProps,
      chartData,
      keyword
    }
  }
})
</script>

<style lang="scss"></style>

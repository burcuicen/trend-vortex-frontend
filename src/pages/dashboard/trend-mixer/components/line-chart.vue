<template lang="pug">
q-select(outlined v-model="selectedTimeLimit"  :options="timeLimitOptions" label="Select Time Limit" style="min-width: 400px;")
.q-mt-md(ref="chartDom" style="width: 100%; height: 600px;" :id="chartId")
</template>
<script lang="ts">
import { ref, onMounted, watch, defineComponent } from 'vue'
import * as echarts from 'echarts'

import { TChartDataItem } from 'src/components/t-chart/types'
export interface TChartDataSeries {
  name: string
  color: string
  data: TChartDataItem[]
}

export default defineComponent({
  name: 'LineChart',
  props: {
    chartId: {
      type: String,
      required: true
    },
    series: {
      type: Array as () => TChartDataSeries[],
      required: true
    }
  },
  setup(props) {
    const chartDom = ref<HTMLDivElement | null>(null)
    let chartInstance: echarts.ECharts | null = null
    const timeLimitOptions = [
      { label: 'Last 3 Months', value: '3m' },
      { label: 'Last 6 Months', value: '6m' },
      { label: 'Last 12 Months', value: '12m' },
      { label: 'Last 3 Years', value: '36m' },
      { label: 'Last 5 Years', value: '60m' },
      { label: 'Last 10 Years', value: '120m' },
      { label: 'All', value: 'all' }
    ]
    const selectedTimeLimit = ref({
      value: 'all',
      label: 'All'
    })
    const getLineChartOption = (series: TChartDataSeries[]) => {
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: series.map(s => s.name),
          orient: 'horizontal',
          top: 'bottom'
        },
        xAxis: {
          type: 'category',
          data: series[0]?.data.map(item => item.name) || []
        },
        yAxis: { type: 'value' },
        series: series.map(s => ({
          name: s.name,
          type: 'line',
          data: s.data.map(item => item.value),
          itemStyle: {
            color: s.color
          }
        }))
      }
    }
    function handleTimeLimitChange() {
      const monthReductions: Record<string, number> = {
        '3m': 3,
        '6m': 6,
        '12m': 12,
        '36m': 36,
        '60m': 60,
        '120m': 120
      }

      const currentDate = new Date()
      const cutOffDate =
        selectedTimeLimit.value.value === 'all'
          ? new Date(0)
          : new Date(currentDate.setMonth(currentDate.getMonth() - monthReductions[selectedTimeLimit.value.value]))

      return props.series.map(s => ({
        ...s,
        data: s.data.filter(item => {
          const [monthStr, year] = item.name.split(' ')
          const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(monthStr)
          const itemDate = new Date(parseInt(year), monthIndex)
          return itemDate >= cutOffDate
        })
      }))
    }

    const initChart = () => {
      if (chartInstance) {
        chartInstance.dispose()
      }

      chartInstance = echarts.init(chartDom.value as HTMLDivElement)
      const dataForChart = props.series

      const specificOption = getLineChartOption(dataForChart)

      const baseOption: echarts.EChartsOption = {
        title: {
          left: 'center'
        }
      }

      chartInstance.setOption({ ...baseOption, ...specificOption })
    }

    onMounted(initChart)
    watch((newVal, oldVal) => {
      return newVal !== oldVal
    }, initChart)
    watch(selectedTimeLimit, () => {
      const filteredSeries = handleTimeLimitChange()
      const specificOption = getLineChartOption(filteredSeries)
      chartInstance?.setOption(specificOption, true)
    })

    return {
      chartDom,
      timeLimitOptions,
      selectedTimeLimit
    }
  }
})
</script>

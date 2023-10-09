<template lang="pug">
.chart.q-mt-md
  .row.flex.justify-between
    q-btn-toggle.type-toggle(v-model="selectedChartType" toggle-color="primary" :options="chartTypeOptions")
      template(v-slot:pie)
        q-icon(name="pie_chart")
      template(v-slot:bar)
        q-icon(name="bar_chart")
      template(v-slot:line)
        q-icon(name="show_chart")
      template(v-slot:radar)
        q-icon(name="track_changes")
      template(v-slot:scatter)
        q-icon(name="scatter_plot")
      template(v-slot:area)
        q-icon(name="area_chart")
      template(v-slot:histogram)
        q-icon(name="insert_chart_outlined")
      template(v-slot:doughnut)
        q-icon(name="donut_large")
      template(v-slot:funnel)
        q-icon(name="filter_list")
    .filters
      q-btn-toggle(v-model="selectedDataLimit" toggle-color="primary" :options="dataLimitOptions")
      //-q-btn-toggle(v-model="selectedColorPaletteKey" toggle-color="primary" :options="colorThemes")

  .q-mt-md(ref="chartDom" style="width: 100%; height: 600px;" :id="chartId")
</template>
<script lang="ts">
import { ref, onMounted, watch, defineComponent, computed } from 'vue'
//import { ColorGenerator } from 'src/helpers/color-generator'
import { COLOR_PALETTE_PURPLE, COLOR_PALETTE_ORANGE, COLOR_PALETTE_BLUE } from 'src/constants/color-palettes'
import { chartTypeOptions, dataLimitOptions, chartOptionFunctions, colorThemes } from '../t-chart/constants'
import * as echarts from 'echarts'

interface TChartDataItem {
  name: string
  value: number
}

export default defineComponent({
  name: 'TChart',
  props: {
    chartId: {
      type: String,
      required: true
    },
    data: {
      type: Array as () => TChartDataItem[],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    pieLabel: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const chartDom = ref<HTMLDivElement | null>(null)
    let chartInstance: echarts.ECharts | null = null
    const DATA_LIMIT = 50

    const selectedChartType = ref('pie')

    const selectedDataLimit = ref(DATA_LIMIT)

    const selectedColorPaletteKey = ref('green')
    const selectedPalette = computed(() => colorThemes.find(item => item.value === selectedColorPaletteKey.value)?.palette)

    const prepareSortedData = () => {
      const mergedData = props.data.reduce((acc: TChartDataItem[], curr) => {
        const found = acc.find(item => item.name === curr.name)
        if (found) {
          found.value += curr.value
        } else {
          acc.push({ ...curr })
        }
        return acc
      }, [])

      const sortedData = [...mergedData].sort((a, b) => b.value - a.value)
      const dataForPieChart = sortedData.slice(0, selectedDataLimit.value)

      const othersValue = sortedData.slice(selectedDataLimit.value).reduce((acc, curr) => acc + curr.value, 0)
      if (sortedData.length > selectedDataLimit.value && othersValue > 0) {
        dataForPieChart.push({ name: 'Others', value: othersValue })
      }
      return dataForPieChart
    }

    const initChart = () => {
      if (chartInstance) {
        chartInstance.dispose()
      }

      chartInstance = echarts.init(chartDom.value as HTMLDivElement)
      const dataForChart = prepareSortedData()

      let specificOption = {}
      if (chartOptionFunctions[selectedChartType.value])
        specificOption = chartOptionFunctions[selectedChartType.value](dataForChart, props.pieLabel, selectedPalette.value)

      const baseOption: echarts.EChartsOption = {
        title: {
          //text: props.title,
          left: 'center'
        },
        color: selectedPalette.value
      }

      chartInstance.setOption({ ...baseOption, ...specificOption })
    }

    onMounted(initChart)
    watch(() => props.data, initChart)
    watch(selectedChartType, initChart)
    watch(selectedDataLimit, initChart)
    watch(selectedColorPaletteKey, initChart)

    return { chartDom, chartTypeOptions, selectedChartType, selectedDataLimit, dataLimitOptions, selectedColorPaletteKey, colorThemes }
  }
})
</script>
<style lang="scss">
.type-toggle {
  .q-btn__content {
    flex-direction: row-reverse;
    gap: 6px;
  }
}
</style>

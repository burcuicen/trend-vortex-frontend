import { COLOR_PALETTE_PURPLE, COLOR_PALETTE_ORANGE, COLOR_PALETTE_BLUE, COLOR_PALETTE_GREEN, COLOR_PALETTE_RED } from 'src/constants/color-palettes'
import { IChartType } from '../t-chart/types'
export interface TChartDataItem {
  name: string
  value: number
}
export interface TChartOption {
  label: 'Pie' | 'Bar' | 'Area' | 'Radar' | 'Histogram' | 'Line' | 'Doughnut' | 'Scatter' | 'Funnel'
  value: IChartType
  slot: 'pie' | 'bar' | 'area' | 'radar' | 'histogram' | 'line' | 'doughnut' | 'scatter' | 'funnel'
}
export const chartTypeOptions = [
  { label: 'Pie', value: 'pie', slot: 'pie' },
  { label: 'Bar', value: 'bar', slot: 'bar' },
  { label: 'Area', value: 'area', slot: 'area' },
  { label: 'Radar', value: 'radar', slot: 'radar' },
  { label: 'Histogram', value: 'histogram', slot: 'histogram' },
  { label: 'Line', value: 'line', slot: 'line' },
  { label: 'Doughnut', value: 'doughnut', slot: 'doughnut' },
  { label: 'Scatter', value: 'scatter', slot: 'scatter' },
  { label: 'Funnel', value: 'funnel', slot: 'funnel' }
] as TChartOption[]
export const dataLimitOptions = [
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
  { label: 'All', value: 250 }
]
export const timeLimitOptions = [
  { label: 'Last 3 Months', value: '3m' },
  { label: 'Last 6 Months', value: '6m' },
  { label: 'Last 12 Months', value: '12m' },
  { label: 'Last 3 Years', value: '36m' },
  { label: 'Last 5 Years', value: '60m' },
  { label: 'Last 10 Years', value: '120m' },
  { label: 'All', value: 'all' }
]
export const colorThemes = [
  { label: 'Purple', value: 'purple', slot: 'purple', palette: COLOR_PALETTE_PURPLE },
  { label: 'Blue', value: 'blue', slot: 'blue', palette: COLOR_PALETTE_BLUE },
  { label: 'Orange', value: 'orange', slot: 'orange', palette: COLOR_PALETTE_ORANGE },
  { label: 'Green', value: 'green', slot: 'green', palette: COLOR_PALETTE_GREEN },
  { label: 'Red', value: 'red', slot: 'red', palette: COLOR_PALETTE_RED }
]

export const getPieChartOption = (dataForChart: TChartDataItem[], pieLabel: string) => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    series: [
      {
        name: pieLabel,
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '60%'],
        data: dataForChart,
        label: {
          formatter: params => `${params.name}: ${params.percent.toFixed(2)}%`
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}
export const getBarChartOption = (dataForChart: TChartDataItem[], pieLabel: string, hueVariations: string[]) => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    xAxis: {
      type: 'category',
      data: dataForChart.map(item => item.name),
      axisLabel: { interval: 0, rotate: 45 }
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: pieLabel,
        type: 'bar',
        data: dataForChart.map(item => item.value),
        itemStyle: {
          color: params => hueVariations[params.dataIndex % hueVariations.length]
        }
      }
    ]
  }
}
export const getAreaChartOption = (dataForChart: TChartDataItem[], pieLabel: string) => {
  return {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: dataForChart.map(item => item.name)
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: pieLabel,
        type: 'line',
        data: dataForChart.map(item => item.value),
        areaStyle: {}
      }
    ]
  }
}
export const getRadarChartOption = (dataForChart: TChartDataItem[], pieLabel: string) => {
  return {
    tooltip: {},
    radar: {
      indicator: dataForChart.map(item => ({ name: item.name, max: 100 }))
    },
    series: [
      {
        name: pieLabel,
        type: 'radar',
        data: [{ value: dataForChart.map(item => item.value), name: pieLabel }]
      }
    ]
  }
}
export const getHistogramChartOption = (dataForChart: TChartDataItem[], pieLabel: string) => {
  return {
    tooltip: {},
    xAxis: [{ type: 'value', name: 'Count' }],
    yAxis: [{ type: 'category', data: dataForChart.map(item => item.name) }],
    series: [
      {
        name: pieLabel,
        type: 'bar',
        data: dataForChart.map(item => item.value)
      }
    ]
  }
}
export const getLineChartOption = (dataForChart: TChartDataItem[], pieLabel: string) => {
  return {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: dataForChart.map(item => item.name)
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: pieLabel,
        type: 'line',
        data: dataForChart.map(item => item.value)
      }
    ]
  }
}
export const getDoughnutChartOption = (dataForChart: TChartDataItem[], pieLabel: string) => {
  return {
    ...getPieChartOption(dataForChart, pieLabel),
    series: [
      {
        ...getPieChartOption(dataForChart, pieLabel).series[0],
        radius: ['30%', '70%']
      }
    ]
  }
}
export const getScatterChartOption = (dataForChart: TChartDataItem[], pieLabel: string) => {
  return {
    xAxis: { type: 'category' },
    yAxis: { type: 'value' },
    series: [
      {
        name: pieLabel,
        type: 'scatter',
        data: dataForChart.map(item => [item.name, item.value])
      }
    ]
  }
}
export const getFunnelChartOption = (dataForChart: TChartDataItem[], pieLabel: string) => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: pieLabel,
        type: 'funnel',
        data: dataForChart
      }
    ]
  }
}
export const chartOptionFunctions = {
  pie: getPieChartOption,
  bar: getBarChartOption,
  area: getAreaChartOption,
  radar: getRadarChartOption,
  histogram: getHistogramChartOption,
  line: getLineChartOption,
  doughnut: getDoughnutChartOption,
  scatter: getScatterChartOption,
  funnel: getFunnelChartOption
}

export interface TChartDataItem {
  name: string
  value: number
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
]
export const dataLimitOptions = [
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
  { label: 'All', value: 250 }
]
export const colorThemes = [
  { label: 'Purple', value: 'purple', slot: 'purple' },
  { label: 'Blue', value: 'blue', slot: 'blue' },
  { label: 'Orange', value: 'orange', slot: 'orange' },
  { label: 'Green', value: 'green', slot: 'green' },
  { label: 'Red', value: 'red', slot: 'red' }
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

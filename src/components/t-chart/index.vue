<template lang="pug">
.chart.q-mt-md
  .row.flex.justify-between
    q-btn-toggle(v-model="selectedChartType" toggle-color="primary" :options="chartTypeOptions")
    q-btn-toggle(v-model="selectedDataLimit" toggle-color="primary" :options="dataLimitOptions")
  div(ref="chartDom" style="width: 100%; height: 600px;" :id="chartId")
</template>
<script lang="ts">
import { ref, onMounted, watch, defineComponent } from 'vue';
import { generateHueVariations, COLOR_PALETTE_PURPLE, COLORS } from 'src/constants/color-palettes';
import * as echarts from 'echarts';

interface TChartDataItem {
  name: string;
  value: number;
}

export default defineComponent({
  name: 'TChart',
  props: {
    chartId: {
      type: String,
      required: true,
    },
    data: {
      type: Array as () => TChartDataItem[],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    pieLabel: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const chartDom = ref<HTMLDivElement | null>(null);
    let chartInstance: echarts.ECharts | null = null;
    const DATA_LIMIT = 50;

    const selectedChartType = ref('pie');
    const chartTypeOptions = [
      { label: 'Pie', value: 'pie' },
      { label: 'Bar', value: 'bar' },
      { label: 'Area', value: 'area' },
      { label: 'Radar', value: 'radar' },
      { label: 'Histogram', value: 'histogram' },
      { label: 'Line', value: 'line' },
      { label: 'Doughnut', value: 'doughnut' },
      { label: 'Scatter', value: 'scatter' },
      { label: 'Funnel', value: 'funnel' },
    ];


    const selectedDataLimit = ref(DATA_LIMIT);
    const dataLimitOptions = [
      { label: '10', value: 10 },
      { label: '20', value: 20 },
      { label: '50', value: 50 },
      { label: '100', value: 100 },
      { label: 'All', value: 250 },
    ];
    const hueVariations = generateHueVariations(COLOR_PALETTE_PURPLE, 250);

    const prepareSortedData = () => {
      const mergedData = props.data.reduce((acc: TChartDataItem[], curr) => {
        const found = acc.find(item => item.name === curr.name);
        if (found) {
          found.value += curr.value;
        } else {
          acc.push({ ...curr });
        }
        return acc;
      }, []);

      const sortedData = [...mergedData].sort((a, b) => b.value - a.value);
      const dataForPieChart = sortedData.slice(0, selectedDataLimit.value);

      const othersValue = sortedData.slice(selectedDataLimit.value).reduce((acc, curr) => acc + curr.value, 0);
      if (sortedData.length > selectedDataLimit.value && othersValue > 0) {
        dataForPieChart.push({ name: 'Others', value: othersValue });
      }
      return dataForPieChart;
    };

    const getPieChartOption = (dataForChart: TChartDataItem[]) => {
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        series: [
          {
            name: props.pieLabel,
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '60%'],
            data: dataForChart,
            label: {
              formatter: (params) => `${params.name}: ${params.percent.toFixed(2)}%`,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
    };

    const getBarChartOption = (dataForChart: TChartDataItem[]) => {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
        },
        xAxis: {
          type: 'category',
          data: dataForChart.map(item => item.name),
          axisLabel: { interval: 0, rotate: 45 },
        },
        yAxis: { type: 'value' },
        series: [
          {
            name: props.pieLabel,
            type: 'bar',
            data: dataForChart.map(item => item.value),
            itemStyle: {
              color: (params) => hueVariations[params.dataIndex % hueVariations.length],
            },
          },
        ],
      };
    };
    const getAreaChartOption = (dataForChart: TChartDataItem[]) => {
      return {
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: dataForChart.map(item => item.name),
        },
        yAxis: { type: 'value' },
        series: [{
          name: props.pieLabel,
          type: 'line',
          data: dataForChart.map(item => item.value),
          areaStyle: {},
        }],
      };
    };
    const getRadarChartOption = (dataForChart: TChartDataItem[]) => {
      return {
        tooltip: {},
        radar: {
          indicator: dataForChart.map(item => ({ name: item.name, max: 100 })), // Assumes max value to be 100; you might need to adjust
        },
        series: [{
          name: props.pieLabel,
          type: 'radar',
          data: [{ value: dataForChart.map(item => item.value), name: props.pieLabel }],
        }],
      };
    };
    const getHistogramChartOption = (dataForChart: TChartDataItem[]) => {
      return {
        tooltip: {},
        xAxis: [{ type: 'value', name: 'Count' }],
        yAxis: [{ type: 'category', data: dataForChart.map(item => item.name) }],
        series: [{
          name: props.pieLabel,
          type: 'bar',
          data: dataForChart.map(item => item.value),
        }],
      };
    };
    const getLineChartOption = (dataForChart: TChartDataItem[]) => {
      return {
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: dataForChart.map(item => item.name),
        },
        yAxis: { type: 'value' },
        series: [{
          name: props.pieLabel,
          type: 'line',
          data: dataForChart.map(item => item.value),
        }],
      };
    };
    const getDoughnutChartOption = (dataForChart: TChartDataItem[]) => {
      return {
        ...getPieChartOption(dataForChart),
        series: [
          {
            ...getPieChartOption(dataForChart).series[0],
            radius: ['30%', '70%'],
          },
        ],
      };
    };
    const getScatterChartOption = (dataForChart: TChartDataItem[]) => {
      return {
        xAxis: { type: 'category' },
        yAxis: { type: 'value' },
        series: [{
          name: props.pieLabel,
          type: 'scatter',
          data: dataForChart.map(item => [item.name, item.value]),
        }],
      };
    };
    const getFunnelChartOption = (dataForChart: TChartDataItem[]) => {
      return {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c}%",
        },
        series: [{
          name: props.pieLabel,
          type: 'funnel',
          data: dataForChart,
        }],
      };
    };





    const initChart = () => {
      if (chartInstance) {
        chartInstance.dispose();
      }

      chartInstance = echarts.init(chartDom.value as HTMLDivElement);
      const dataForChart = prepareSortedData();

      let specificOption = {};
      if (selectedChartType.value === 'pie') {
        specificOption = getPieChartOption(dataForChart);
      } else if (selectedChartType.value === 'bar') {
        specificOption = getBarChartOption(dataForChart);
      } else if (selectedChartType.value === 'area') {
        specificOption = getAreaChartOption(dataForChart);
      } else if (selectedChartType.value === 'radar') {
        specificOption = getRadarChartOption(dataForChart);
      } else if (selectedChartType.value === 'histogram') {
        specificOption = getHistogramChartOption(dataForChart);
      } else if (selectedChartType.value === 'line') {
        specificOption = getLineChartOption(dataForChart);
      } else if (selectedChartType.value === 'doughnut') {
        specificOption = getDoughnutChartOption(dataForChart);
      } else if (selectedChartType.value === 'scatter') {
        specificOption = getScatterChartOption(dataForChart);
      } else if (selectedChartType.value === 'funnel') {
        specificOption = getFunnelChartOption(dataForChart);
      }

      const baseOption: echarts.EChartsOption = {
        title: {
          //text: props.title,
          left: 'center',
        },
        color: hueVariations,
      };

      chartInstance.setOption({ ...baseOption, ...specificOption });
    };

    onMounted(initChart);
    watch(() => props.data, initChart);
    watch(selectedChartType, initChart);
    watch(selectedDataLimit, initChart);

    return { chartDom, chartTypeOptions, selectedChartType, selectedDataLimit, dataLimitOptions };
  },
});
</script>

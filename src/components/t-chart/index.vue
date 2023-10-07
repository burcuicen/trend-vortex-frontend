<template lang="pug">
.chart.q-mt-md
  .row.flex.justify-between
    q-btn-toggle(v-model="selectedChartType" toggle-color="primary" :options="chartTypeOptions")
    q-btn-toggle(v-model="selectedDataLimit" toggle-color="primary" :options="dataLimitOptions")
  div(ref="chartDom" style="width: 100%; height: 600px;" :id="chartId")
</template>
<script lang="ts">
import { ref, onMounted, watch, defineComponent } from 'vue';
import { generateHueVariations, COLOR_PALETTE_PURPLE } from 'src/constants/color-palettes';
import { chartTypeOptions, dataLimitOptions, chartOptionFunctions } from '../t-chart/constants';
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

    const selectedDataLimit = ref(DATA_LIMIT);
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

    const initChart = () => {
      if (chartInstance) {
        chartInstance.dispose();
      }

      chartInstance = echarts.init(chartDom.value as HTMLDivElement);
      const dataForChart = prepareSortedData();

      let specificOption = {};
      if (chartOptionFunctions[selectedChartType.value]) specificOption = chartOptionFunctions[selectedChartType.value](dataForChart, props.pieLabel, hueVariations);


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

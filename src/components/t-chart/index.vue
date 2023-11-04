<template lang="pug">
.chart.q-mt-md
  .row.flex.justify-between
    q-btn-toggle.type-toggle.q-mb-md(v-model="selectedChartType" toggle-color="primary" :options="chartTypeOptions")
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
      q-btn-toggle.filters__length(v-if="showLengthLimit" v-model="selectedDataLimit" toggle-color="primary" :options="dataLimitOptions")
      q-select.filters__time(v-if="showTimeLimit" outlined v-model="selectedTimeLimit"  :options="timeLimitOptions" label="Select Time Limit" style="min-width: 300px;")
      q-btn-toggle.filters__colors(v-model="selectedColorPaletteKey" :toggle-color="selectedColorPaletteKey" :options="colorThemes")
  .chart-container
    .q-mt-md(ref="chartDom" style="width: 100%; height: 600px;" :id="chartId")
    TDownload(v-if="chartInstance" :chartInstance="chartInstance" style="justify-content:flex-end" :title="title" :keyword="keyword")

</template>
<script lang="ts">
import { ref, onMounted, watch, defineComponent, computed } from 'vue';
import * as echarts from 'echarts';

import {
  chartTypeOptions,
  dataLimitOptions,
  timeLimitOptions,
  chartOptionFunctions,
  colorThemes,
} from '../t-chart/constants';
import { IChartType, TChartDataItem } from '../t-chart/types';
import TDownload from 'src/components/t-download/index.vue';
export default defineComponent({
  name: 'TChart',
  components: {
    TDownload,
  },
  props: {
    keyword: {
      type: String,
    },
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
    dataLimit: {
      type: Number,
      default: 10,
    },
    showLengthLimit: {
      type: Boolean,
      default: false,
    },
    showTimeLimit: {
      type: Boolean,
      default: false,
    },
    disabledChartTypes: {
      type: Array as () => IChartType[],
      default: () => [],
    },
    defaultSelectedChartType: {
      type: String,
      default: 'pie',
    },
  },
  setup(props) {
    const chartDom = ref<HTMLDivElement | null>(null);

    const chartInstance = ref<echarts.ECharts | null>(null);

    const selectedChartType = ref(props.defaultSelectedChartType || 'pie');
    const modifiedChartTypeOptions = computed(() => {
      const options = chartTypeOptions.filter(
        (option) => !props.disabledChartTypes.includes(option.value)
      );

      const defaultIndex = options.findIndex(
        (option) => option.value === props.defaultSelectedChartType
      );
      if (defaultIndex > -1) {
        const defaultOption = options.splice(defaultIndex, 1)[0];
        options.unshift(defaultOption);
      }

      return options;
    });

    const selectedDataLimit = ref(props.dataLimit);

    const selectedColorPaletteKey = ref('purple');
    const selectedPalette = computed(
      () =>
        colorThemes.find((item) => item.value === selectedColorPaletteKey.value)
          ?.palette
    );

    const selectedTimeLimit = ref({
      value: 'all',
      label: 'All',
    });

    function handleTimeLimitChange() {
      const filteredData = props.data.filter((item) => item.value !== 0);

      const currentDate = new Date();

      const monthReductions: Record<string, number> = {
        '3m': 3,
        '6m': 6,
        '12m': 12,
        '36m': 36,
        '60m': 60,
        '120m': 120,
      };

      const cutOffDate =
        selectedTimeLimit.value.value === 'all'
          ? new Date(0)
          : new Date(
              currentDate.setMonth(
                currentDate.getMonth() -
                  monthReductions[selectedTimeLimit.value.value]
              )
            );

      return filteredData.filter((item) => {
        const [monthStr, year] = item.name.split(' ');
        const monthIndex = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ].indexOf(monthStr);
        const itemDate = new Date(parseInt(year), monthIndex);
        return itemDate >= cutOffDate;
      });
    }

    const prepareSortedData = () => {
      if (props.showTimeLimit) {
        return handleTimeLimitChange();
      }

      const mergedData = props.data.reduce((acc: TChartDataItem[], curr) => {
        const found = acc.find((item) => item.name === curr.name);
        if (found) {
          found.value += curr.value;
        } else {
          acc.push({ ...curr });
        }
        return acc;
      }, []);

      const sortedData = [...mergedData].sort((a, b) => b.value - a.value);
      const dataForPieChart = props.showLengthLimit
        ? sortedData.slice(0, selectedDataLimit.value)
        : sortedData;

      const othersValue = sortedData
        .slice(selectedDataLimit.value)
        .reduce((acc, curr) => acc + curr.value, 0);
      if (sortedData.length > selectedDataLimit.value && othersValue > 0) {
        dataForPieChart.push({ name: 'Others', value: othersValue });
      }
      return dataForPieChart;
    };

    const initChart = () => {
      if (chartInstance.value) {
        chartInstance.value.dispose();
      }

      chartInstance.value = echarts.init(chartDom.value as HTMLDivElement);
      const dataForChart = prepareSortedData();

      let specificOption = {};
      if (chartOptionFunctions[selectedChartType.value])
        specificOption = chartOptionFunctions[selectedChartType.value](
          dataForChart,
          props.pieLabel,
          selectedPalette.value
        );

      const baseOption: echarts.EChartsOption = {
        title: {
          left: 'center',
        },
        color: selectedPalette.value,
      };

      chartInstance.value.setOption({ ...baseOption, ...specificOption });
    };

    onMounted(initChart);
    watch(() => props.data, initChart);
    watch(selectedChartType, initChart);
    watch(selectedDataLimit, initChart);
    watch(selectedColorPaletteKey, initChart);
    watch(selectedTimeLimit, initChart);

    return {
      chartDom,
      chartTypeOptions: modifiedChartTypeOptions,
      selectedChartType,
      selectedDataLimit,
      dataLimitOptions,
      selectedColorPaletteKey,
      colorThemes,
      timeLimitOptions,
      selectedTimeLimit,
      chartInstance,
    };
  },
});
</script>
<style lang="scss" scoped>
.type-toggle {
  @media (max-width: 600px) {
    flex-wrap: wrap;
    box-shadow: none;

  }
  .q-btn__content {
    flex-direction: row-reverse;
    gap: 6px;
  }
}
.filters {
  display: flex;
  gap: 18px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
  &__time {
    @media (max-width: 600px) {
    width: 100px;
  }
  }
  &__colors {
    @media (max-width: 600px) {
      flex-wrap: wrap;
      box-shadow: none;
  }
  }
}
</style>

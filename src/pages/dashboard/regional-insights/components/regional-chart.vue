<template lang="pug">
div(ref="chartDom" style="width: 100%; height: 600px;")
</template>

<script lang="ts">
import { ref, onMounted, watch, defineComponent } from 'vue';
import * as echarts from 'echarts';

interface GeoMapDataItem {
  formattedValue: string[];
  geoCode: string;
  geoName: string;
  hasData: boolean[];
  maxValueIndex: number;
  value: number[];
}

export default defineComponent({
  name: 'RegionalChart',
  props: {
    geoMapData: {
      type: Array as () => GeoMapDataItem[],
      required: true,
    },
  },
  setup(props) {
    const chartDom = ref<HTMLDivElement | null>(null);
    let chartInstance: echarts.ECharts | null = null;

    const initChart = () => {
      if (chartInstance) {
        chartInstance.dispose();
      }
      chartInstance = echarts.init(chartDom.value as HTMLDivElement);

      const sortedData = [...props.geoMapData]
        .filter(item => item.hasData[0])
        .sort((a, b) => b.value[0] - a.value[0]);

      const top15Data = sortedData.slice(0, 15);

      const othersValue = sortedData.slice(15).reduce((acc, curr) => acc + curr.value[0], 0);

      const dataForPieChart = top15Data.map(item => ({
        name: item.geoName,
        value: item.value[0],
      }));

      if (sortedData.length > 15 && othersValue > 0) {
        dataForPieChart.push({
          name: 'Others',
          value: othersValue
        });
      }

      const option: echarts.EChartsOption = {
        title: {
          text: 'Search Interest by Country',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: ['#57007B', '#AA0070', '#E0395C', '#FD7A4B', '#FFBA4B', '#F9F871'],
        series: [
          {
            name: 'Search Interest',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '60%'],
            data: dataForPieChart,
            label: {
              formatter: (params: any) => {
                return `${params.name}: ${params.percent.toFixed(2)}%`;
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
          },
        ],

      };

      chartInstance.setOption(option);
    };

    onMounted(() => {
      initChart();
    });

    watch(() => props.geoMapData, () => {
      initChart();
    });

    return { chartDom };
  },
});
</script>

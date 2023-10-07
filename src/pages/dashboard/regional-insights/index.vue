<template lang="pug">
.q-pa-md.page.page--regional
  THeader(
    title="Regional Insights"
    content="Get insights on how your keywords are performing in different regions."
  )
  .page__content.row.q-col-gutter-sm
    .col-12
      RegionalInsightsForm(@search="getData")
    .col-12
      .page__results
        TLoading(v-if="loading")
        TChart(v-else-if="!loading && chartData.length" v-bind="regionalChartProps" :data="chartData")
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { api } from 'src/plugins';
import { useQuasar } from 'quasar';

import TInDevelopment from 'src/components/t-in-development/index.vue';
import THeader from 'src/pages/dashboard/components/header.vue';
import TChart from 'src/components/t-chart/index.vue';
import TLoading from 'src/components/t-loading/index.vue';

import RegionalInsightsForm from './components/regional-form.vue';

import { GeoMapDataItem, TChartDataItem } from 'src/components/t-chart/types';
export default defineComponent({
  name: 'RegionalInsightsPage',
  components: {
    TInDevelopment,
    THeader,
    TLoading,
    TChart,
    RegionalInsightsForm,
  },
  setup() {
    const $q = useQuasar()

    const loading = ref(false);
    const rawData = ref(null);
    const chartData = ref<TChartDataItem[]>([])

    const regionalChartProps = {
      chartId: 'regional-chart',
      title: 'Search Interest by Country',
      pieLabel: 'Search Volume',
    }
    async function getData(query: { keyword: string }) {
      loading.value = true

      const { err, res } = await api.googleTrends.fetchInterestByRegion(query)

      if (err) {
        loading.value = false
        $q.notify({
          color: 'negative',
          message: err.message,
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
      if (!raw) return

      raw.forEach((item: GeoMapDataItem) => {
        chartData.value.push({
          name: item.geoName,
          value: item.value[0]
        })
      })
    }
    return {
      getData,
      loading,
      rawData,
      chartData,
      regionalChartProps
    };
  }
});
</script>

<style lang="scss" scoped></style>

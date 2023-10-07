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


</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TInDevelopment from 'src/components/t-in-development/index.vue';
import THeader from 'src/pages/dashboard/components/header.vue';
import TLoading from 'src/components/t-loading/index.vue';
import RegionalInsightsForm from './components/regional-form.vue';
import { api } from 'src/plugins';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'RegionalInsightsPage',
  components: {
    TInDevelopment,
    THeader,
    TLoading,
    RegionalInsightsForm
  },
  setup() {
    const $q = useQuasar()

    const loading = ref(false);

    const rawData = ref<any>(null);

    async function getData(query: any) {
      loading.value = true
      const { err, res } = await api.googleTrends.fetchInterestByRegion(query)
      if (err) {
        loading.value = false

        return $q.notify({
          color: 'negative',
          message: err.message,
        })
      }
      rawData.value = res
      loading.value = false

    }
    return {
      getData,
      loading
    };
  }
});
</script>

<style lang="scss" scoped></style>

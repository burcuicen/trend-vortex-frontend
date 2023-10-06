<template lang="pug">
.q-pa-md.page.page--regional
  THeader(
    title="Regional Insights"
    content="Get insights on how your keywords are performing in different regions."
  )
  .page__content
    RegionalInsightsForm

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TInDevelopment from 'src/components/t-in-development/index.vue';
import THeader from 'src/pages/dashboard/components/header.vue';
import RegionalInsightsForm from './components/regional-form.vue';

export default defineComponent({
  name: 'RegionalInsightsPage',
  components: {
    TInDevelopment,
    THeader,
    RegionalInsightsForm
  },
});
</script>

<style lang="scss" scoped></style>

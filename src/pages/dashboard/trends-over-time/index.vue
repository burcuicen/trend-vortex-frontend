<template lang="pug">
.q-pa-md.page.page--trends
  .page__header
    .page__header-title Trends Over Time
  .page__content
    | The Trends Over Time page allows users to track and visualize how the popularity or interest in a specific keyword has changed over time, based on data from the Google Trends API.
  .page__form
    //TrendsOverTimeForm
    TInDevelopment

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TInDevelopment from 'src/components/t-in-development/index.vue';
import TrendsOverTimeForm from 'src/pages/dashboard/trends-over-time/components/form.vue';

export default defineComponent({
  name: 'TrendsOverTimePage',
  components: {
    TInDevelopment,
    TrendsOverTimeForm
  }
});
</script>

<style lang="scss"></style>

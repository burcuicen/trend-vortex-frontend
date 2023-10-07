<template lang="pug">
.q-pa-md.page.page--trends
  TInDevelopment

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TInDevelopment from 'src/components/t-in-development/index.vue';

export default defineComponent({
  name: 'TrendsOverTimePage',
  components: {
    TInDevelopment
  }
});
</script>

<style lang="scss"></style>

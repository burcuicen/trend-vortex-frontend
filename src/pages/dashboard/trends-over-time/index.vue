<template lang="pug">
q-page
  t-in-development
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TInDevelopment from 'src/components/t-in-development/index.vue';

export default defineComponent({
  name: 'TrendsOverTimePage',
  components: {
    TInDevelopment,
  },
});
</script>

<style lang="scss" scoped></style>

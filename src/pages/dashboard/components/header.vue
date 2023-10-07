
<template lang="pug">
.t-header
  .page__header
    .page__header-title {{ title }}
  .page__content {{ content }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TrendsOverTimePage',
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }
});
</script>

<style lang="scss">
.t-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>

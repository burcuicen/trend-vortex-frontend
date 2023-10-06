<template lang="pug">
.col-12.row.q-col-gutter-md
  .col-12.col-md-9
    q-input(v-model="keyword" label="Keyword" outlined class="q-mb-md")
      template(v-slot:prepend)
        q-icon.cursor-pointer(name="search")
  .col-12.col-md-3
    q-btn(icon="event" round color="info")
      q-popup-proxy(@before-show="updateProxy" cover transition-show="scale" transition-hide="scale")
        q-date(v-model="selectedDateRange" range)
          .row.items-center.justify-end.q-gutter-sm
            q-btn(label="Cancel" color="primary" flat v-close-popup)
            q-btn(label="OK" color="primary" flat @click="save" v-close-popup)
    q-chip(v-if="selectedDateRange && selectedDateRange.from && selectedDateRange.to" color="primary" text-color="white")
      | {{ selectedDateRange.from }} - {{ selectedDateRange.to }}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'RegionalInsightsForm',
  setup() {
    const keyword = ref('')
    const selectedDateRange = ref(null)
    return {
      keyword,
      selectedDateRange
    }
  },
})
</script>

<style lang="scss"></style>

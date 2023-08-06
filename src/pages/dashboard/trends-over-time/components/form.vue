<template lang="pug">
.trends__form
  q-input(
    v-model="keyword"
    label="Keyword"
    outlined
    dense
    class="q-mb-md"
  )
  q-input(v-model="startDate" mask="date" :rules="['date']" outlined dense class="q-mb-md")
    template(v-slot:prepend)
      q-icon.cursor-pointer(name="event")
        q-popup-proxy(cover transition-show="scale" transition-hide="scale")
          q-date(v-model="startDate")
            div.row.items-center.justify-end
              q-btn(v-close-popup label="Close" color="primary" flat)
              q-btn(v-close-popup label="Save" color="primary" flat)
  q-input(v-model="endDate" mask="date" :rules="['date']" outlined dense class="q-mb-md")
    template(v-slot:prepend)
      q-icon.cursor-pointer(name="event")
        q-popup-proxy(cover transition-show="scale" transition-hide="scale")
          q-date(v-model="endDate")
            div.row.items-center.justify-end
              q-btn(v-close-popup label="Close" color="primary" flat)
              q-btn(v-close-popup label="Save" color="primary" flat)
  q-select(
    v-model="selectedCountry"
    :options="countries"
    label="Country"
    use-input
    input-debounce="0"
    @filter="filterFn"
    outlined
    dense
    class="q-mb-md"
  )
    template(v-slot:no-option)
      q-item
        q-item-section.text-grey
          q-item-label No results

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { COUNTRIES } from 'src/constants/countries';

export default defineComponent({
  name: 'TrendsOverTimeForm',
  data() {
    return {
      keyword: '',
      startDate: '',
      endDate: '',
      countries: COUNTRIES,
      selectedCountry: '',
    };
  },
  methods: {
    filterFn(val: string, update: (cb: () => void) => void) {
      if (val === '') {
        this.$nextTick(() => { update(() => { this.countries = COUNTRIES; }); });
        update(() => { this.selectedCountry = ''; }); return;
      }
      const needle = val.toLowerCase();
      update(() => { this.countries = COUNTRIES.filter(v => v.label.toLowerCase().indexOf(needle) > -1); });
    },
  }
});
</script>

<style lang="scss"></style>

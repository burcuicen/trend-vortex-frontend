<template lang="pug">
.q-pa-md.page.page--regional
    THeader(
      title="Trend Mixer"
      content="Mix and match keywords to compare trends over time."
    )
    .col-12.row.q-col-gutter-sm
      .col-12.col-md-4
        CardInput
      .col-12.col-md-4
        CardInput(bgColor="#D9F6FF" chartColor="#52CBF0")
      .col-12.col-md-4
        CardInput(bgColor="#FFEBE0" chartColor="#FF7527")
      .col-12.col-md-4(v-if="hasPerformedFirstSearch")
        .add-keyword(@click="add")
          q-icon.cursor-pointer(name="add" size="1.5em")
          span Compare another keywords
    .col-12.col-md-12.flex.justify-end
      q-btn(label="Start" color="primary" @click="search")

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import THeader from 'src/pages/dashboard/components/header.vue'
import CardInput from './components/card-input.vue'

export default defineComponent({
  name: 'TrendMixerPage',
  components: {
    THeader,
    CardInput
  },
  setup() {
    const hasPerformedFirstSearch = ref(false)
    const keywords = ref([])

    function search() {
      //hasPerformedFirstSearch.value = true
    }
    function add() {
      keywords.value.push('')
    }
    return {
      search,
      add,
      hasPerformedFirstSearch
    }
  }
})
</script>

<style lang="scss" scoped>
.add-keyword {
  cursor: pointer;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  border-radius: 8px;
  border: 1px solid #57007b;
  background-color: #57007b;
  color: white;

  padding: 24px;
}
</style>

<template lang="pug">
q-card
  q-card-section
    .text-h6 {{ title }}
    q-card-actions
      q-btn-toggle(v-model="selectedDataLimit" toggle-color="primary" :options="dataLimitOptions")
  q-card-section
    keyword-list(:data="limitedKeywordData" height="250px")

</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { KeywordCardItemProps } from '../types'

import KeywordList from './keyword-list.vue'

export default defineComponent({
  name: 'TopResultsCard',
  components: {
    KeywordList
  },
  props: {
    data: {
      type: Array as () => KeywordCardItemProps[],
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const selectedDataLimit = ref(3)

    const dataLimitOptions = ref([
      { label: 'Top 3', value: 3 },
      { label: 'Top 5', value: 5 },
      { label: 'Top 10', value: 10 }
    ])

    const limitedKeywordData = computed(() => {
      return props.data.slice(0, selectedDataLimit.value)
    })
    return {
      dataLimitOptions,
      selectedDataLimit,
      limitedKeywordData
    }
  }
})
</script>

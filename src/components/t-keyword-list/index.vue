<template lang="pug">
.row.q-col-gutter-md.q-mb-lg(v-if="splitDataByType")
  .col-6(v-if="featuredData.length")
    top-results-card(:data="featuredData" title="Top Featured Keywords")
  .col-6(v-if="notFeaturedData.length")
    top-results-card(:data="notFeaturedData" title="Top Not Featured Keywords")
.row.q-col-gutter-md.q-mb-lg(v-else)
  .col-12
    top-results-card(:data="data" :title="title")
.col-12
  keyword-list(:data="data")
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { KeywordCardItemProps } from './types'

import TopResultsCard from './components/top-results.vue'
import KeywordList from './components/keyword-list.vue'

export default defineComponent({
  name: 'TKeywordList',
  components: {
    TopResultsCard,
    KeywordList
  },
  props: {
    data: {
      type: Array as () => KeywordCardItemProps[],
      required: true
    },
    splitDataByType: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Top Keywords'
    }
  },
  setup(props) {
    const featuredData = ref<KeywordCardItemProps[]>([])
    const notFeaturedData = ref<KeywordCardItemProps[]>([])

    function getFeaturedData() {
      return props.data.filter(item => item?.featured)
    }
    function getNotFeaturedData() {
      return props.data.filter(item => !item?.featured)
    }
    onMounted(() => {
      if (!props.splitDataByType) {
        return
      }
      featuredData.value = getFeaturedData()
      notFeaturedData.value = getNotFeaturedData()
    })

    return {
      featuredData,
      notFeaturedData
    }
  }
})
</script>

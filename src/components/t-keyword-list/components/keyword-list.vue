<template lang="pug">
q-list.col-12(bordered separator)
    q-scroll-area(:style="{ height }")
      div(v-for="item in data" :key="item.name")
        keyword-card(:data="item")
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { KeywordCardItemProps } from '../types'

import KeywordCard from './keyword-card.vue'

export default defineComponent({
  name: 'KeywordList',
  components: {
    KeywordCard
  },
  props: {
    data: {
      type: Array as () => KeywordCardItemProps[],
      required: true
    },
    height: {
      type: String,
      default: '600px'
    }
  },
  setup() {
    return {}
  }
})
</script>

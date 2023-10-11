<template lang="pug">
.keyword-list
    q-scroll-area(style="height:600px;")
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import KeywordCard from './keyword-card.vue'
interface KeywordDataItem {
  name: string
  value: number
  featured: boolean
}
export default defineComponent({
  name: 'KeywordList',
  components: {
    KeywordCard
  },
  props: {
    data: {
      type: Array as () => KeywordDataItem[],
      required: true
    }
  },
  setup(props) {
    onMounted(() => {
      prepareKeywordCardItems()
    })
    const keywordData = ref<KeywordDataItem[]>([])
    function prepareKeywordCardItems() {
      keywordData.value = props.data.map(item => {
        return {
          name: item.name,
          value: item.value,
          featured: item.featured,
          link: `https://www.google.com/search?q=${item.name}`
        }
      })
    }
    return {
      keywordData
    }
  }
})
</script>

<template lang="pug">
.keyword-list
    q-scroll-area(style="height:600px")
      q-list(bordered separator)
        q-item(v-for="item in keywordData" clickable style="padding:20px")
          q-icon.q-mr-md(name="search" size="2em" color="primary")
          q-item-section
            q-item-label {{ item.name }}
            q-item-label(caption lines=2) Search Volume &nbsp;
              b  {{ item.value }}
          q-item-section(side)
            q-badge(outline :label="getFeaturedLabel(item)" :color="getFeaturedColor(item)")
          q-item-section(side)
            q-btn(:href="item.link" target="_blank" icon="open_in_new" color="primary" flat)
          q-item-section(side)
            q-btn(icon="content_copy" color="primary" flat @click="copyToClipboard(item.name)")
          q-separator
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'

interface KeywordDataItem {
  name: string
  value: number
  featured: boolean
}
export default defineComponent({
  name: 'KeywordList',
  props: {
    data: {
      type: Array as () => KeywordDataItem[],
      required: true
    }
  },
  setup(props) {
    const $q = useQuasar()

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
    function getFeaturedLabel(item: KeywordDataItem) {
      return item.featured ? 'Featured' : 'Not Featured'
    }
    function getFeaturedColor(item: KeywordDataItem) {
      return item.featured ? 'primary' : 'grey'
    }
    function copyToClipboard(text: string) {
      navigator.clipboard.writeText(text)
      $q.notify({
        message: 'Copied to clipboard',
        color: 'primary',
        icon: 'done'
      })
    }

    return {
      keywordData,
      getFeaturedLabel,
      getFeaturedColor,
      copyToClipboard
    }
  }
})
</script>

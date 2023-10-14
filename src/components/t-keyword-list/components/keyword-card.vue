<template lang="pug">
q-item(clickable style="padding:20px")
    q-icon.q-mr-md(name="search" size="2em" color="primary")
    q-item-section
      q-item-label {{ data.name }}
      q-item-label(caption lines=2) Search Volume &nbsp;
        b  {{ data.value }}
    q-item-section(side v-if="data.featured !== undefined")
      q-badge(outline :label="getFeaturedLabel(data)" :color="getFeaturedColor(data)")
    q-item-section(side v-if="data.link")
      q-btn(:href="data.link" target="_blank" icon="open_in_new" color="primary" flat)
    q-item-section(side)
      q-btn(icon="content_copy" color="primary" flat @click="copyToClipboard(data.name)")
    q-separator

</template>
<script lang="ts">
import { useQuasar } from 'quasar'
import { defineComponent } from 'vue'
import { KeywordCardItemProps } from '../types'

export default defineComponent({
  name: 'KeywordCard',
  props: {
    data: {
      type: Object as () => KeywordCardItemProps,
      required: true
    }
  },
  setup() {
    const $q = useQuasar()

    function getFeaturedLabel(item: KeywordCardItemProps) {
      return item.featured ? 'Featured' : 'Not Featured'
    }
    function getFeaturedColor(item: KeywordCardItemProps) {
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
      getFeaturedLabel,
      getFeaturedColor,
      copyToClipboard
    }
  }
})
</script>

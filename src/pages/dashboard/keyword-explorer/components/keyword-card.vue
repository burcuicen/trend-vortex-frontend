<template lang="pug">


</template>
<script lang="ts">
import { defineComponent } from 'vue'
interface KeywordCardItem {
  name: string
  value: number
  featured: boolean
  link: string
}
export default defineComponent({
  name: 'KeywordCard',
  props: {
    data: {
      type: Object as () => KeywordCardItem,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

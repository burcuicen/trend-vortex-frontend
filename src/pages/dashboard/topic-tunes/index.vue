<template lang="pug">
.q-pa-md.page.page--regional
    THeader(
      title="Topic Tunes"
      content="Enter a keyword to explore the category trends"
    )
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import THeader from 'src/pages/dashboard/components/header.vue'

export default defineComponent({
  name: 'TopicTunesPage',
  components: {
    THeader
  }
})
</script>

<style lang="scss" scoped></style>

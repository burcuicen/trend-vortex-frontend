<template lang="pug">
.q-pa-md.page.page--regional
    THeader(
      title="Category Explorer"
      content="Enter a keyword to explore the category trends"
    )
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TInDevelopment from 'src/components/t-in-development/index.vue'

export default defineComponent({
  name: 'CategoryTrendsPage',
  components: {
    TInDevelopment
  }
})
</script>

<style lang="scss" scoped></style>

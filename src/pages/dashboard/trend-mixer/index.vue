<template lang="pug">
.q-pa-md.page.page--regional
    THeader(
      title="Trend Mixer"
      content="Mix and match keywords to compare trends over time."
    )
    .col-12.row.q-col-gutter-sm
      .col-12
        .keyword
          .keyword__area
            .keyword__color
            input.keyword__input(v-model="initialSearch" @keyup.enter="search" placeholder="Enter a keyword")
          .keyword__actions
              q-icon.cursor-pointer(name="close" size="md")
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import THeader from 'src/pages/dashboard/components/header.vue'

export default defineComponent({
  name: 'TrendMixerPage',
  components: {
    THeader
  },
  setup() {
    const initialSearch = ref('')
    const performedFirstSearch = ref(false)
    function search() {
      if (!performedFirstSearch.value) {
        performedFirstSearch.value = true
      }
      //TODO: implement search
    }
    return {
      initialSearch,
      search
    }
  }
})
</script>

<style lang="scss" scoped>
.keyword {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding: 32px;
  border: 1px solid #57007b;

  background: #f9ecff;
  &__area {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  &__color {
    display: flex;
    flex-shrink: 0;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    background-color: #57007b;
  }
  &__input {
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 500;
    color: #57007b;
    background: transparent;
    width: 100%;
  }
}
</style>

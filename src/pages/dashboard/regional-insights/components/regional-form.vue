<template lang="pug">
.col-12.row.q-col-gutter-sm
  .col-12
    q-input(v-model="keyword" label="Keyword" outlined)
      template(v-slot:prepend)
        q-icon.cursor-pointer(name="search")
  .col-12.col-md-12.flex.justify-end
    q-btn(label="Search" color="primary" @click="search")
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'RegionalInsightsForm',
  emits: ['search'],
  setup(props, { emit }) {
    const keyword = ref('')
    function search() {
      const query = {
        keyword: keyword.value
      }
      emit('search', query)
    }
    return {
      keyword,
      search
    }
  },
})
</script>

<style lang="scss"></style>

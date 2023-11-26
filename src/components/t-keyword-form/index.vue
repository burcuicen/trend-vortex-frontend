<template lang="pug">
.col-12.row.q-col-gutter-sm
    .col-12
      q-input(v-model="keyword" label="Keyword" @keyup.enter="search" filled)
        template(v-slot:prepend)
          q-icon.cursor-pointer(name="search" color="primary")
    .col-12.col-md-12.flex.justify-end
      BaseButton(label="Search" type="secondary" @click="search")
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BaseButton from 'src/components/_base/base-button.vue'

export default defineComponent({
  name: 'TKeywordForm',
  emits: ['search'],
  components: {
    BaseButton
  },
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
  }
})
</script>

<style lang="scss"></style>

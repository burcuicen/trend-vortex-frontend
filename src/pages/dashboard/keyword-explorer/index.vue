<template lang="pug">
q-page
  //- q-input(placeholder="Search for keywords" v-model="text")
  //- q-btn(color="primary" label="Extract" @click="extractColors2()")
  t-in-development
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TInDevelopment from 'src/components/t-in-development/index.vue'

export default defineComponent({
  name: 'KeywordExplorerPage',
  components: {
    TInDevelopment
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    extractColorCodesFromText(text: string) {
      const regex = /Hex (#[A-Fa-f0-9]{6})/g
      let match
      const hexCodes = []

      while ((match = regex.exec(text)) !== null) {
        hexCodes.push(match[1])
      }
      console.log(hexCodes)
      return hexCodes
    },
    extractColors2() {
      const hexValues = Array.from(this.text.matchAll(/#([A-Fa-f0-9]{6})/g), m => m[0])
      console.log(hexValues)
    }
  }
})
</script>

<style lang="scss" scoped></style>

<template lang="pug">
.buttons
    q-btn(square color="primary" icon="download" @click="saveAsImage") Save as Image
    q-btn(square color="primary" icon="picture_as_pdf" @click="saveAsPDF") Save as PDF
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { jsPDF } from 'jspdf'

export default defineComponent({
  name: 'TDownload',
  props: {
    chartInstance: {
      type: Object as () => echarts.ECharts | null,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    keyword: {
      type: String
    }
  },
  setup(props) {
    const saveAsImage = () => {
      if (props.chartInstance) {
        const url = props.chartInstance.getDataURL({
          type: 'png',
          pixelRatio: 2,
          backgroundColor: '#fff'
        })
        const link = document.createElement('a')
        link.href = url
        link.download = `${props.title}-${props.keyword}.png`
        link.click()
      }
    }
    const generateTitle = () => {
      return `${props.title} of the keyword(s) ${props.keyword}`
    }

    const saveAsPDF = () => {
      if (props.chartInstance) {
        const url = props.chartInstance.getDataURL({
          type: 'png',
          pixelRatio: 2,
          backgroundColor: '#fff'
        })

        const pdf = new jsPDF()
        const pageWidth = 210
        const pageHeight = 297
        const titleFontSize = 12
        const titleHeight = (titleFontSize / 72) * 25.4
        const paddingBelowTitle = 10
        const topMargin = 16
        const sideMargin = 20

        const img = new Image()
        img.src = url
        img.onload = () => {
          const naturalWidth = img.width
          const naturalHeight = img.height

          const aspectRatio = naturalWidth / naturalHeight

          let imgWidth = pageWidth - 2 * sideMargin
          let imgHeight = imgWidth / aspectRatio

          if (imgHeight > pageHeight - topMargin - titleHeight - paddingBelowTitle) {
            imgHeight = pageHeight - topMargin - titleHeight - paddingBelowTitle
            imgWidth = imgHeight * aspectRatio
          }

          const y = topMargin + titleHeight + paddingBelowTitle

          pdf.setFontSize(titleFontSize)
          pdf.text(generateTitle(), 10, topMargin + titleHeight)

          pdf.addImage(url, 'PNG', sideMargin, y, imgWidth, imgHeight)

          pdf.save(`${props.title}-${props.keyword}.pdf`)
        }
      }
    }

    return {
      saveAsImage,
      saveAsPDF
    }
  }
})
</script>
<style lang="scss">
.buttons {
  display: flex;
  gap: 16px;
}
</style>

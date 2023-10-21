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
        link.download = `${props.title}-${props.keyword}.png` // Updated this line
        link.click()
      }
    }

    const saveAsPDF = () => {
      if (props.chartInstance) {
        const url = props.chartInstance.getDataURL({
          type: 'png',
          pixelRatio: 2,
          backgroundColor: '#fff'
        })

        const pdf = new jsPDF()
        const pageWidth = 210 // A4 width in mm
        const pageHeight = 297 // A4 height in mm

        // Load the image to extract its natural width and height
        const img = new Image()
        img.src = url
        img.onload = () => {
          const naturalWidth = img.width
          const naturalHeight = img.height

          const aspectRatio = naturalWidth / naturalHeight

          let imgWidth = pageWidth
          let imgHeight = imgWidth / aspectRatio

          if (imgHeight > pageHeight) {
            imgHeight = pageHeight
            imgWidth = imgHeight * aspectRatio
          }

          const y = (pageHeight - imgHeight) / 2

          // Add the image
          pdf.addImage(url, 'PNG', 0, y, imgWidth, imgHeight)

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

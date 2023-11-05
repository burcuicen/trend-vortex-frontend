<template lang="pug">
.q-pa-md.page.page--regional
      THeader(
        title="Trend Mixer"
        content="Mix and match keywords to compare trends over time."
      )
      .col-12.row.q-col-gutter-sm.card-container
        .col(v-for="keyword in keywords" :key="keyword.id")
          CardInput(
            :bgColor="keyword.bgColor"
            :chartColor="keyword.chartColor"
            @search="(value) => keyword.value = value"
            @remove="remove(keyword.id)"
          )
        .col(v-if="showAddKeywordButton")
          .add-keyword(@click="add")
            q-icon.cursor-pointer(name="add" size="1.5em")
            span Compare another keywords
      .col-12.col-md-12.flex.justify-end
        q-btn(:label="getButtonLabel()" color="primary" @click="search")
      .col-12
        TLoading(v-if="isLoading")
        TNoResult(v-else-if="!isLoading && errorOccurred")
        .page__results(v-if = "preparedSeachResults.length && !isLoading && !errorOccurred")
          LineChart(:chart-id="'myChartId'" :series="preparedSeachResults")
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import THeader from 'src/pages/dashboard/components/header.vue'
import CardInput from './components/card-input.vue'
import LineChart from './components/line-chart.vue'
import TLoading from 'src/components/t-loading/index.vue'
import TNoResult from 'src/components/t-no-result/index.vue'
import { api } from 'src/plugins'
import { useQuasar } from 'quasar'

const InitialKeywordCardInputOptions = [
  {
    id: 1,
    bgColor: '#f9ecff',
    chartColor: '#57007b'
  },
  {
    id: 2,
    bgColor: '#D9F6FF',
    chartColor: '#52CBF0'
  },
  {
    id: 3,
    bgColor: '#FFEBE0',
    chartColor: '#FF7527'
  }
]

export default defineComponent({
  name: 'TrendMixerPage',
  components: {
    THeader,
    CardInput,
    LineChart,
    TLoading,
    TNoResult
  },
  setup() {
    const $q = useQuasar()

    const hasPerformedFirstSearch = ref(false)
    const isLoading = ref(false)
    const errorOccurred = ref(false)

    const keywords = ref([
      {
        id: 1,
        bgColor: '#f9ecff',
        chartColor: '#57007b',
        value: ''
      }
    ])
    function getButtonLabel() {
      return keywords.value.length === 1 ? 'Search' : 'Mix it Up!'
    }

    const availableKeywordOptions = ref(InitialKeywordCardInputOptions.filter(option => !keywords.value.some(keyword => keyword.id === option.id)))

    const showAddKeywordButton = computed(() => {
      return keywords.value.length < InitialKeywordCardInputOptions.length && hasPerformedFirstSearch.value
    })
    const searchResults = ref<{ keyword: string; data: any }[]>([])
    const preparedSeachResults = computed(() => {
      return searchResults.value.map(result => {
        return {
          name: result.keyword,
          color: keywords.value.find(keyword => keyword.value === result.keyword)?.chartColor,
          data: result.data.map((dataPoint: any) => ({
            name: dataPoint.formattedTime,
            value: dataPoint.value[0]
          }))
        }
      })
    })

    async function search() {
      hasPerformedFirstSearch.value = true
      isLoading.value = true

      const keywordValues = keywords.value.map(k => k.value)

      const requests = keywordValues.map((keyword, index) => {
        const existingData = searchResults.value.find(res => res.keyword === keyword)
        if (existingData) {
          return Promise.resolve({ data: existingData.data }) // Return already stored data wrapped in a promise
        }
        return sendRequestWithDelay(keyword) // Fetch new data
      })

      const results = await Promise.allSettled(requests)

      const errors = results.filter(r => r.status === 'rejected') as PromiseRejectedResult[]
      if (errors.length) {
        showError(errors[0].reason.message || 'An error occurred')
      } else {
        results.forEach((r, index) => {
          if (r.status === 'fulfilled') {
            const keyword = keywordValues[index]
            if (!searchResults.value.some(res => res.keyword === keyword)) {
              // Only push new results
              searchResults.value.push({ keyword: keyword, data: r.value.data.default.timelineData })
            }
          }
        })
      }
      // Filter out stale data that no longer matches the current keywords
      searchResults.value = searchResults.value.filter(res => keywordValues.includes(res.keyword))

      isLoading.value = false
    }

    function showError(message: string) {
      errorOccurred.value = true
      $q.notify({
        color: 'negative',
        message: message
      })
    }

    async function sendRequestWithDelay(keyword: string, delay = 1000): Promise<any> {
      await new Promise(resolve => setTimeout(resolve, delay))

      const query = { keyword }
      const { err, res } = await api.googleTrends.fetchInterestOverTime(query)

      if (err) {
        throw new Error(err.message)
      }

      return res
    }

    function add() {
      if (!availableKeywordOptions.value.length) return
      const nextAvailableOption = availableKeywordOptions.value.shift()
      keywords.value.push({
        id: nextAvailableOption.id,
        bgColor: nextAvailableOption.bgColor,
        chartColor: nextAvailableOption.chartColor,
        value: ''
      })
    }
    function remove(id: number) {
      if (keywords.value.length === 1) return
      const index = keywords.value.findIndex(k => k.id === id)
      const removedKeyword = keywords.value.splice(index, 1)[0]
      availableKeywordOptions.value.push({
        id: removedKeyword.id,
        bgColor: removedKeyword.bgColor,
        chartColor: removedKeyword.chartColor
      })
    }

    return {
      availableKeywordOptions,
      keywords,
      hasPerformedFirstSearch,
      search,
      add,
      showAddKeywordButton,
      remove,
      searchResults,
      isLoading,
      errorOccurred,
      preparedSeachResults,
      getButtonLabel
    }
  }
})
</script>

<style lang="scss" scoped>
.add-keyword {
  cursor: pointer;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  border-radius: 8px;
  border: 1px solid #57007b;
  background-color: #57007b;
  color: white;

  padding: 24px;
}
.card-container {
  @media (max-width: 600px) {
    flex-direction: column;
  }
}
</style>

export interface TChartDataItem {
  name: string
  value: number
}
export interface GeoMapDataItem {
  formattedValue: string[]
  geoCode: string
  geoName: string
  hasData: boolean[]
  maxValueIndex: number
  value: number[]
}
export type IChartType = 'pie' | 'bar' | 'line' | 'radar' | 'scatter' | 'area' | 'histogram' | 'doughnut' | 'funnel'

export interface DailyTrendsParams {
  geo: string
  trendDate?: Date
}
export interface InterestByRegionParams {
  keyword: string
  startTime?: Date
  endTime?: Date
  geo?: string
  resolution?: string
}
export interface InterestOverTimeParams {
  keyword: string
  startTime?: Date
  endTime?: Date
  geo?: string
}
export interface RealTimeParams {
  geo: string
  hl?: string
  timezone?: number
  category?: string
}
export interface RelatedQueriesParams {
  keyword: string
  startTime?: Date
  endTime?: Date
  geo?: string
  hl?: string
  timezone?: number
  category?: string
}
export interface RelatedTopicsParams {
  keyword: string
  startTime?: Date
  endTime?: Date
  geo?: string
  hl?: string
  timezone?: number
  category?: string
}

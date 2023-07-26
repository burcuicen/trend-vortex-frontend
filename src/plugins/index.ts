import { App } from 'vue'
import { TrendVortexAPI } from '../api'

export const api = TrendVortexAPI.getInstance()

export function createPlugins(app: App): void {
  app.config.globalProperties.$api = api
}

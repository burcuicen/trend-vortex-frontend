import { boot } from 'quasar/wrappers'
import { createPlugins } from '../plugins'
import { TrendVortexAPI } from '../api'

export const api = TrendVortexAPI.getInstance()

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: TrendVortexAPI
  }
}

export default boot(async ({ app }) => {
  createPlugins(app)
})

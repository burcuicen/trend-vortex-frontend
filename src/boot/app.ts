import { boot } from 'quasar/wrappers'
import { createPlugins } from '../plugins'
import { TrendVortexAPI } from '../api'
import { BarrierRepository } from '../api/repositories/barrier.repository'
import { HttpClient } from '../api/http-client'

export const api = TrendVortexAPI.getInstance()

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: TrendVortexAPI
  }
}

export default boot(async ({ app }) => {
  createPlugins(app)

  // Set up the interval to ping the server every 14 minutes
  const httpClient = new HttpClient()
  const barrierRepo = new BarrierRepository(httpClient)
  await barrierRepo.fetchBarrier()
  window.setInterval(async () => {
    try {
      await barrierRepo.fetchBarrier()
      console.log('Server pinged successfully!')
    } catch (error) {
      console.error('Error pinging the server:', error)
    }
  }, 14 * 60 * 1000) // 14 minutes in milliseconds
})

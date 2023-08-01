import { route } from 'quasar/wrappers'
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import routes from './routes'

export default route(function (/* { store, ssrContext } */) {
  const Router = createRouter({
    history: createWebHistory(),
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes
  })

  return Router
})

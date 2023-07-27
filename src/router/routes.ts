import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/main-layout.vue'),
    children: [
      { path: '', component: () => import('src/pages/landing/index.vue') },
      { path: 'login', component: () => import('src/pages/auth/login.vue') },
      { path: 'register', component: () => import('src/pages/auth/register.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/main-layout.vue'),
    children: [
      { path: '', name: 'GuestHome', component: () => import('src/pages/landing/index.vue') },
      { path: 'login', name: 'Login', component: () => import('src/pages/auth/login.vue') },
      { path: 'register', name: 'Register', component: () => import('src/pages/auth/register.vue') }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('src/layouts/dashboard-layout.vue'),
    children: [{ path: '', name: 'Dashboard', component: () => import('src/pages/dashboard/index.vue') }]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

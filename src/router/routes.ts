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
    children: [
      { path: '', name: 'Dashboard', component: () => import('src/pages/dashboard/index.vue') },
      { path: 'trends-over-time', name: 'TrendsOverTime', component: () => import('src/pages/dashboard/trends-over-time/index.vue') },
      { path: 'regional-insights', name: 'RegionalInsights', component: () => import('src/pages/dashboard/regional-insights/index.vue') },
      { path: 'keyword-explorer', name: 'KeywordExplorer', component: () => import('src/pages/dashboard/keyword-explorer/index.vue') },
      { path: 'trends-comparision', name: 'TrendsComparision', component: () => import('src/pages/dashboard/trends-comparision/index.vue') },
      { path: 'category-trends', name: 'CategoryTrends', component: () => import('src/pages/dashboard/category-trends/index.vue') },
      { path: 'my-research', name: 'MyResearch', component: () => import('src/pages/dashboard/my-research/index.vue') },
      { path: 'profile', name: 'Profile', component: () => import('src/pages/dashboard/profile/index.vue') }
    ]
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('src/pages/auth/logout.vue')
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

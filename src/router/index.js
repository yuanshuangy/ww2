import { createRouter, createWebHistory } from 'vue-router'
import WeatherOverview from '../views/WeatherOverview.vue'
import WeatherTrend from '../views/WeatherTrend.vue'
import WeatherAnalysis from '../views/WeatherAnalysis.vue'

const routes = [
  {
    path: '/',
    name: 'overview',
    component: WeatherOverview
  },
  {
    path: '/trend',
    name: 'trend',
    component: WeatherTrend
  },
  {
    path: '/analysis',
    name: 'analysis',
    component: WeatherAnalysis
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

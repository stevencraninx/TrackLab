import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '@/views/DashboardView.vue'
import AthletesView from '@/views/AthletesView.vue'
import TrainingsView from '@/views/TrainingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      component: DashboardView,
    },
    {
      path: '/athletes',
      component: AthletesView,
    },
    {
      path: '/trainings',
      component: TrainingsView,
    },
  ],
})

export default router

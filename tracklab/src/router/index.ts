import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '@/views/DashboardView.vue'
import AthletesView from '@/views/AthletesView.vue'
import TrainingsView from '@/views/TrainingsView.vue'
import AthleteDetailView from '@/views/AthleteDetailView.vue'
import AthleteCreateView from '@/views/AthleteCreateView.vue'
import AthleteEditView from '@/views/AthleteEditView.vue'

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
      path: '/athletes/:id',
      name: 'athlete-detail',
      component: AthleteDetailView,
    },
    {
      path: '/athletes/new',
      name: 'add-athlete',
      component: AthleteCreateView,
    },
    {
      path: '/athletes/:id/edit',
      name: 'edit-athlete',
      component: AthleteEditView,
    },
    {
      path: '/trainings',
      component: TrainingsView,
    },
  ],
})

export default router

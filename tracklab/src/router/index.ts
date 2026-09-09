import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '@/views/DashboardView.vue'

import TrainingsView from '@/views/TrainingsView.vue'

import AthletesView from '@/views/AthletesView.vue'
import AthleteDetailView from '@/views/AthleteDetailView.vue'
import AthleteCreateView from '@/views/AthleteCreateView.vue'
import AthleteEditView from '@/views/AthleteEditView.vue'

import CompetitionsView from '@/views/CompetitionsView.vue'
import CompetitionDetailView from '@/views/CompetitionDetailView.vue'
import CompetitionCreateView from '@/views/CompetitionCreateView.vue'
import CompetitionEditView from '@/views/CompetitionEditView.vue'

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
      path: '/competitions',
      component: CompetitionsView,
    },
    {
      path: '/competitions/:id',
      name: 'competition-detail',
      component: CompetitionDetailView,
    },
    {
      path: '/competitions/new',
      name: 'add-competition',
      component: CompetitionCreateView,
    },
    {
      path: '/competitions/:id/edit',
      name: 'edit-competition',
      component: CompetitionEditView,
    },
    {
      path: '/trainings',
      component: TrainingsView,
    },
  ],
})

export default router

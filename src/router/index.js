import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/patients',
      name: 'patients',
      component: () => import('../views/PatientsView.vue')
    },
    {
      path: '/patients/:id',
      name: 'patient-profile',
      component: () => import('../views/PatientProfileView.vue')
    },
    {
      path: '/doctors',
      name: 'doctors',
      component: () => import('../views/DoctorsView.vue')
    },
    {
      path: '/appointments',
      name: 'appointments',
      component: () => import('../views/AppointmentsView.vue')
    },
    {
      path: '/billing',
      name: 'billing',
      component: () => import('../views/BillingView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue')
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import RegistroView from '../views/RegistroView.vue'
import InicioView from '../views/InicioView.vue'
import PresupuestoView from '../views/PresupuestoView.vue'
import ProductosView from '../views/ProductosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/registro',
      name: 'registro',
      component: RegistroView,
    },
    {
      path: '/inicio',
      name: 'inicio',
      component: InicioView,
    },
    {
      path: '/presupuesto',
      name: 'presupuesto',
      component: PresupuestoView,
    },
    {
      path: '/productos',
      name: 'productos',
      component: ProductosView,
    },
  ],
})

export default router

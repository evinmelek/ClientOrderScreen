import { createRouter, createWebHistory } from 'vue-router'
import WithoutAd from '../views/WithoutAd.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: WithoutAd
  },
//  {
//    path: '/withad',
//    name: 'withad',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
//    component: () => import(/* webpackChunkName: "about" */ '../views/WithAd.vue')
//  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

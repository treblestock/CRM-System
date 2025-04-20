import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";



const routes = [
  {
    path: '/',
    name: 'main',
    props: true,
    component: () => import('~/pages/main.vue'),
    children: [
      
    ],
  },
] satisfies RouteRecordRaw[]

const router = createRouter({
  routes,
  history: createWebHistory(),
})


export default router
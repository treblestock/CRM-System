import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";



const routes = [
  {
    path: '/',
    name: 'main',
    props: true,
    redirect: { name: 'TodoList' },
    component: () => import('~/pages/DefaultLayout.vue'),
    children: [
      {
        path: '/todo-list',
        name: 'TodoList',
        props: true,
        component: () => import('~/pages/TodoListPage.vue'),
        children: [
          
        ],

      },
      {
        path: '/user-profile',
        name: 'UserProfile',
        props: true,
        component: () => import('~/pages/UserProfilePage.vue'),
        children: [
          
        ],
      }
    ],
  },
] satisfies RouteRecordRaw[]

const router = createRouter({
  routes,
  history: createWebHistory(),
})


export default router
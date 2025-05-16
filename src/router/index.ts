import type { RouteLocationNormalizedGeneric } from "vue-router"
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import useStoreAuth from '~/stores/auth'


const routes = [
  {
    path: '/',
    name: 'main',
    props: true,
    redirect: { name: 'todoList' },
    component: () => import('~/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '/todo-list',
        name: 'todoList',
        props: true,
        meta: {
          isAuthOnly: true,
        },
        component: () => import('~/pages/TodoListPage.vue'),
      },
      {
        path: '/user-profile',
        name: 'userProfile',
        props: true,
        meta: {
          isAuthOnly: true,
        },
        component: () => import('~/pages/UserProfilePage.vue'),
      }
    ],
  },
  {
    path: '/auth',
    name: 'auth',
    props: true,
    redirect: { name: 'signin' },
    component: () => import('~/layouts/AuthLayout.vue'),
    children: [
      {
        path: 'signin',
        name: 'signin',
        props: true,
        component: () => import('~/pages/SigninFormPage.vue'),
      },
      {
        path: 'signup',
        name: 'signup',
        props: true,
        component: () => import('~/pages/SignupFormPage.vue'),
      },
    ],
  },
] satisfies RouteRecordRaw[]

const router = createRouter({
  routes,
  history: createWebHistory(),
})


async function authMiddleware(to: RouteLocationNormalizedGeneric) {
  const authStore = useStoreAuth()
  
  if (to.meta.isAuthOnly && !authStore.isAuth) {
    const resp = await authStore.refresh()
    
    if (resp.status !== 200) {
      return {name: 'signin'}
    }
  }
}

router.beforeEach(authMiddleware)


export default router
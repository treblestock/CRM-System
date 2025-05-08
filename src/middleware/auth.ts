import type { RouteLocationNormalizedGeneric } from "vue-router"

declare module 'vue-router' {
  export interface RouteMeta {
    isAuthOnly?: boolean
    isAdminOnly?: boolean
  }
}

import useStoreAuth from '~/stores/auth'


export default async (to: RouteLocationNormalizedGeneric) => {
  const authStore = useStoreAuth()
  
  if ((to.meta.isAuthOnly || to.meta.isAdminOnly) && !authStore.isAuth) {
    const resp = await authStore.refresh()
    
    if (resp.status !== 200) {
      return {name: 'signin'}
    }
  }

  if (to.meta.isAdminOnly && !authStore.isAdmin) {
    return {name: 'main'}
  }
}
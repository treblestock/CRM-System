import type { RouteLocationNormalizedGeneric } from "vue-router"


import useStoreAuth from '~/stores/auth'

export default async (to: RouteLocationNormalizedGeneric) => {
  const authStore = useStoreAuth()
  
  if (to.meta.isAuthOnly && !authStore.isAuth) {
    const resp = await authStore.refresh()
    
    if (resp.status !== 200) {
      return {name: 'signin'}
    }
  }
}
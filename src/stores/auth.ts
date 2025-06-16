import { type AxiosResponse } from "axios"
import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { refresh as apiRefresh, signin as apiSignin, signout as apiSignout, signup as apiSignup, getUserProfile } from "~/api/user"
import type { AuthData, Profile, Token } from "~/types/user"
import { axiosBase } from "~/api/base"
import { useRouter } from "vue-router"

const REFRESH_TOKEN_KEY = 'refreshToken'

export default defineStore('auth', () => {
  const router = useRouter()

  const isAuth = ref(false)
  const userProfile = ref<Profile | null>(null)

  const isAdmin = computed(() => userProfile.value?.roles.includes('ADMIN') )

  const signup = apiSignup

  async function signin(authData: AuthData) {
    return apiSignin(authData)
      .then(onSignin)
  }
  
  function onSignin(resp: AxiosResponse<Token>) {
    if (resp.status === 200) {
      const {accessToken, refreshToken} = resp.data
    
      axiosBase.defaults.headers.common.Authorization = `Bearer ${accessToken}` 
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
      isAuth.value = true

      getUserProfile()
        .then((resp) => userProfile.value = resp.data )
        .catch(console.log)
    }
    
    return resp
  }


  async function signout() {
    return apiSignout()
      .then(onSignout)
  }
  
  function onSignout() {
    delete axiosBase.defaults.headers.common.Authorization
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    isAuth.value = false

    userProfile.value = null
    router.push({name: 'signin'})
  }


  async function refresh() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) || ''

    return apiRefresh({ refreshToken })
      .then(onSignin)
  }

  axiosBase.interceptors.response.use(undefined,
    (error) => {
      const resp = error.response as AxiosResponse
      const isAuthRespError = resp?.status === 401

      if (!resp || !isAuthRespError) {
        return error
      }
  
      const isAuthRequest = resp.config.url!.match(/\/auth\/(signin|refresh)$/)

      if (isAuthRequest) {
        onSignout()
        return error
      }
      
      return refresh()
        .then((refreshResp) => refreshResp.status === 200 ? axiosBase({
          ...resp.config,
          headers: {Authorization: 'Bearer ' + refreshResp.data.accessToken}
        }) : error)
    },
  )


  return {
    isAuth,
    userProfile,
    isAdmin,

    signup,
    signin,
    refresh,
    signout,
  }
})
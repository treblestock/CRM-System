import axios, { type AxiosResponse } from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { axiosUser, refresh as apiRefresh, signin as apiSignin, signout as apiSignout, signup as apiSignup } from "~/api/user"
import type { AuthData, Token } from "~/types/user"


const REFRESH_TOKEN_KEY = 'refreshToken'



export default defineStore('auth', () => {
  const router = useRouter()

  const isAuth = ref(false)

  const signup = apiSignup

  function signin(authData: AuthData)  {
    return apiSignin(authData)
      .then(onSignin)
  }
  
  function onSignin(resp: AxiosResponse<Token>) {
    if (resp.status === 200) {
      const {accessToken, refreshToken} = resp.data
    
      axiosUser.defaults.headers.common.Authorization = `Bearer ${accessToken}` 
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
      isAuth.value = true
    } 
    
    return resp
  }

  function signout() {
    return apiSignout()
      .then(onSignout)
  }
  
  function onSignout() {
    delete axiosUser.defaults.headers.common.Authorization
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    isAuth.value = false
    router.push({name: 'signin'})
  }


  async function refresh() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) || ''

    return apiRefresh({ refreshToken })
      .then(onSignin)
  }

  axiosUser.interceptors.response.use(undefined,
    (error) => {
      const resp = error.response as AxiosResponse
      const isAuthRespError = resp.status === 401

      if (!resp || !isAuthRespError) {
        return error
      }
  
      const isAuthRequest = resp.config.url!.match(/\/auth\/(signin|refresh)$/)

      if (isAuthRequest) {
        onSignout()
        return error
      }
      
      return refresh()
        .then((refreshResp) => refreshResp.status === 200 ? axios(resp.config) : error)
    },
  )


  return {
    isAuth,
    signup,
    signin,
    refresh,
    signout,
  }
})
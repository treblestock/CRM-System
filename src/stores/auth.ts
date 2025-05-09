import axios, { AxiosError, type AxiosResponse } from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"
import { axiosUser, refresh as apiRefresh, signin as apiSignin, signout as apiSignout, signup as apiSignup } from "~/api/user"
import type { AuthData, Token } from "~/types/user"


export const REFRESH_TOKEN_KEY = 'refreshToken'



export default defineStore('auth', () => {
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
  }


  async function refresh() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
    if (!refreshToken) {
      return new AxiosError("refresh token is missing", '401')
    }

    return apiRefresh({ refreshToken })
      .then(onSignin)
  }

  axiosUser.interceptors.response.use(undefined,
    (error) => {
      const resp = error.response as AxiosResponse
      if (!resp) {
        return error
      }
  
      const isAuthRequest = resp.config.url!.match(/\/auth\/(signin|refresh)$/)
      // todo: check 403 404
      const isAuthRespError = resp.status === 401

      if (isAuthRequest || !isAuthRespError) {
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



// todo: test


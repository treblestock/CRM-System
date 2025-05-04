import type { AuthData, PasswordRequest, Profile, ProfileRequest, RefreshToken, Token, UserRegistration} from '~/types/user'
import axios, { type AxiosResponse } from 'axios'
const BASE_URL = 'https://easydev.club/api/v1'

export const axiosUser = axios.create({
  baseURL: BASE_URL
})




export const signup = (registrationData: UserRegistration): Promise<AxiosResponse<Profile>> =>
  axiosUser.post('/auth/signup', registrationData)
export const signin = (authData: AuthData): Promise<AxiosResponse<Token>> =>
  axiosUser.post('/auth/signin', authData)
export const refresh = (refreshToken: RefreshToken): Promise<AxiosResponse<Token>> =>
  axiosUser.post('/auth/refresh', refreshToken)
export const getUserProfile = (): Promise<AxiosResponse<Profile>> =>
  axiosUser.get('/user/profile')
// export const updateUserProfile = (profilePatch: ProfileRequest): Promise<AxiosResponse<Profile>> =>
//   axiosUser.put('/user/profile', profilePatch)
// export const updateUserPassword = (passwordRequest: PasswordRequest): Promise<AxiosResponse<string>> =>
//   axiosUser.put('/user/profile/reset-password', passwordRequest)
export const signout = (): Promise<AxiosResponse<string>> =>
  axiosUser.post('/user/logout')


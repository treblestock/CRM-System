import type { AuthData, Profile, RefreshToken, Token, UserRegistration} from '~/types/user'
import { axiosBase, type AxiosResponse } from './base'

export const signup = (registrationData: UserRegistration): Promise<AxiosResponse<Profile>> =>
  axiosBase.post('/auth/signup', registrationData)

export const signin = (authData: AuthData): Promise<AxiosResponse<Token>> =>
  axiosBase.post('/auth/signin', authData)

export const refresh = (refreshToken: RefreshToken): Promise<AxiosResponse<Token>> =>
  axiosBase.post('/auth/refresh', refreshToken)

export const signout = (): Promise<AxiosResponse<string>> =>
  axiosBase.post('/user/logout')

export const getUserProfile = (): Promise<AxiosResponse<Profile>> =>
  axiosBase.get('/user/profile')

// export const updateUserProfile = (profilePatch: ProfileRequest): Promise<AxiosResponse<Profile>> =>
//   axiosBase.put('/user/profile', profilePatch)
// 
// export const updateUserPassword = (passwordRequest: PasswordRequest): Promise<AxiosResponse<string>> =>
//   axiosBase.put('/user/profile/reset-password', passwordRequest)
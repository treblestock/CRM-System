import type { MetaResponse, User, UserFilters, UserRequest, UserRolesRequest } from '~/types/admin'
import { axiosBase, type AxiosResponse } from './base'



export const getUsers = (filters?: UserFilters): Promise<AxiosResponse<MetaResponse<User>> > => 
  axiosBase.get('admin/users', { params: filters })

export const getUser = (id: User['id']): Promise<AxiosResponse<User> > => 
  axiosBase.get(`admin/users/${id}`)

export const updateUser = ({id, patch}: {
  id: User['id']
  patch: UserRequest
}): Promise<AxiosResponse<User> > => 
  axiosBase.put(`admin/users/${id}`, patch)

export const setUserRoles = ({id, roles}: Pick<User, 'id'> & UserRolesRequest): Promise<AxiosResponse<User> > => 
  axiosBase.put(`admin/users/${id}/rights`, roles)

export const blockUser = (id: User['id']): Promise<AxiosResponse<User> > => 
  axiosBase.post(`admin/users/${id}/block`)

export const unblockUser = (id: User['id']): Promise<AxiosResponse<User> > => 
  axiosBase.post(`admin/users/${id}/unblock`)

export const deleteUser = (id: User['id']): Promise<AxiosResponse> => 
  axiosBase.delete(`admin/users/${id}`)
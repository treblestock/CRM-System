import type { FilterOption, MetaResponse, Todo, TodoInfo, TodoRequest } from "~/types/todo"
import { axiosBase, type AxiosResponse } from './base'

export const getTodos = async (filter: FilterOption = 'all'): Promise<AxiosResponse<MetaResponse<Todo, TodoInfo>>> => 
  axiosBase.get(`/todos`, {
    params: { filter }
  })

export const getTodo = async (id: Todo['id']): Promise<AxiosResponse<Todo>> => 
  axiosBase.get(`/todos/${id}`)

export const createTodo = async (newTodo: TodoRequest): Promise<AxiosResponse<Todo>> =>
  axiosBase.post('/todos', newTodo)

export const editTodo = async (id: Todo['id'], newTodo: TodoRequest): Promise<AxiosResponse<Todo>> => 
  axiosBase.put(`/todos/${id}`, newTodo)

export const deleteTodo = async (id: Todo['id']): Promise<AxiosResponse<boolean>> => 
  axiosBase.delete(`/todos/${id}`)
import type { FilterOption, MetaResponse, Todo, TodoInfo, TodoRequest } from "~/types/todo";
import axios, { type AxiosResponse } from 'axios'
const BASE_URL = 'https://easydev.club/api/v1'

const axiosTodo = axios.create({
  baseURL: BASE_URL
})

export const getTodos = async (filter: FilterOption = 'all'): Promise<AxiosResponse<MetaResponse<Todo, TodoInfo>>> => 
  axiosTodo.get(`/todos`, {
    params: { filter }
  })

export const getTodo = async (id: Todo['id']): Promise<AxiosResponse<Todo>> => 
  axiosTodo.get(`/todos/${id}`)

export const createTodo = async (newTodo: TodoRequest): Promise<AxiosResponse<Todo>> =>
  axiosTodo.post('/todos', newTodo)

export const editTodo = async (id: Todo['id'], newTodo: TodoRequest): Promise<AxiosResponse<Todo>> => 
  axiosTodo.put(`/todos/${id}`, newTodo)

export const deleteTodo = async (id: Todo['id']): Promise<AxiosResponse<boolean>> => 
  axiosTodo.delete(`/todos/${id}`)
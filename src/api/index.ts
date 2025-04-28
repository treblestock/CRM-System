import type { FilterOption, MetaResponse, Todo, TodoInfo, TodoRequest } from "~/types";

const BASE_URL = 'https://easydev.club/api/v1'


export const getTodos = async (filter?: FilterOption): Promise<MetaResponse<Todo, TodoInfo>> => {
  const resp = await fetch(BASE_URL + '/todos' + (filter ? `?filter=${filter}` : '') )
  return await resp.json() as MetaResponse<Todo, TodoInfo>
}
export const getTodo = async (id: Todo['id']): Promise<Todo> => {
  const resp = await fetch(BASE_URL + `/todos/${id}`)
  return await resp.json() as Todo
}
export const createTodo = async (newTodo: TodoRequest): Promise<Todo> => {
  const resp = await fetch(BASE_URL + '/todos', {
    method: 'POST', 
    body: JSON.stringify(newTodo)
  })
  return await resp.json() as Todo
}
export const editTodo = async (id: Todo['id'], newTodo: TodoRequest): Promise<Todo> => {
  const resp = await fetch(BASE_URL + `/todos/${id}`, {
    method: 'PUT', 
    body: JSON.stringify(newTodo)
  })
  return await resp.json() as Todo
}
export const deleteTodo = async (id: Todo['id']): Promise<boolean> => {
  return (await fetch(BASE_URL + `/todos/${id}`, {
    method: 'DELETE', 
  })).ok
}
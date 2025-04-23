import type { MetaResponse, Todo, TodoInfo, TodoRequest } from "~/types";

const BASE_URL = 'https://easydev.club/api/v1'

export default {
  async getTodos(): Promise<MetaResponse<Todo, TodoInfo>> {
    const resp = await fetch(BASE_URL + '/todos')
    return await resp.json() as MetaResponse<Todo, TodoInfo>
  },
  async getTodo(id: Todo['id']): Promise<Todo> {
    const resp = await fetch(BASE_URL + `/todos/${id}`)
    return await resp.json() as Todo
  },
  async createTodo(newTodo: TodoRequest): Promise<Todo> {
    const resp = await fetch(BASE_URL + '/todos', {
      method: 'POST', 
      body: JSON.stringify(newTodo)
    })
    return await resp.json() as Todo
  },
  async editTodo(id: Todo['id'], newTodo: TodoRequest): Promise<Todo> {
    const resp = await fetch(BASE_URL + `/todos/${id}`, {
      method: 'PUT', 
      body: JSON.stringify(newTodo)
    })
    return await resp.json() as Todo
  },
  async deleteTodo(id: Todo['id']): Promise<boolean> {
    return (await fetch(BASE_URL + `/todos/${id}`, {
      method: 'DELETE', 
    })).ok
  },

}
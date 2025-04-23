<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import api from '~/api'
import NewTodoForm from '~/components/NewTodoForm.vue';
import TodoFilters from '~/components/TodoFilters.vue';
import TodoList from '~/components/TodoList.vue';
import type { Todo, TodoInfo, TodoRequest } from '~/types';
import { isValidTodoTitle } from '~/utils';



//* Todo list
const todos = ref<Todo[]>([])

onMounted(fetchTodos)
async function fetchTodos() {
  try {
    const resp = await api.getTodos()
    const fetchedTodos = resp.data

    todos.value = fetchedTodos
  } catch (err) {
    todos.value = []
    console.log(err)
  }
}

//* Todo filters
const filteredTodos = computed(() => {
  if (selectedFilter.value === 'all') return todos.value

  const shouldBeDone = selectedFilter.value === 'completed'
  return todos.value.filter(todo => todo.isDone === shouldBeDone)
})
const INITIAL_TODO_INFO: TodoInfo = {
  all: 0,
  inWork: 0,
  completed: 0,
}
const todoInfo = computed<TodoInfo>(
  () => todos.value.reduce((info, todo) => {
    info.all++
    info[todo.isDone ? 'completed' : 'inWork']++
    return info
  }, {...INITIAL_TODO_INFO})
)
const selectedFilter = ref<keyof TodoInfo>('all')

// Todo CRUD
async function onNewTodo(newTodo: Required<TodoRequest>) {
  try {
    const createdTodo = await api.createTodo(newTodo)
    todos.value.push(createdTodo)
    
  } catch (err) {
    console.log(err)
  }
}
async function updateTodo(id: Todo['id'], todoPatch: TodoRequest) {
  if (typeof todoPatch.title === 'string' && !isValidTodoTitle(todoPatch.title) ) return

  const updatedTodo = await api.editTodo(id, todoPatch)
  const todoToUpdate = todos.value.find(todo => todo.id === id) as Todo

  Object.assign(todoToUpdate, updatedTodo)
}
async function deleteTodo(id: Todo['id']) {
  const isDeleted = await api.deleteTodo(id)
  if (isDeleted) todos.value = todos.value.filter(todo => todo.id !== id)
}

</script>

<template>
  <div class="todo-page">
    <NewTodoForm class="new-todo-form"
      @newTodo="onNewTodo"
    ></NewTodoForm>
    <TodoFilters class="todo-filters"
      :all="todoInfo.all"
      :completed="todoInfo.completed"
      :inWork="todoInfo.inWork"

      v-model:selectedFilter="selectedFilter"
    ></TodoFilters>


    <TodoList class="todo-list"
      :todos="filteredTodos"
      @updateTodo="updateTodo"
      @deleteTodo="deleteTodo"
    ></TodoList>

  </div>
</template>

<style scoped>


.todo-page {
  width: min-content;
  margin: 0 auto;

  padding: 20px;
  background: #eee;
}
.new-todo-form {
  margin-bottom: 20px;
}
.todo-filters {
  margin-bottom: 15px;
}
.todo-list {

}


</style>
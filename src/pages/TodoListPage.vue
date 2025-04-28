<script setup lang="ts">
import type { FilterOption, Todo, TodoInfo } from '~/types';
import { getTodos } from '~/api'
import { onActivated, onDeactivated, ref } from 'vue';

import NewTodoForm from '~/components/NewTodoForm.vue';
import TodoFilters from '~/components/TodoFilters.vue';
import TodoList from '~/components/TodoList.vue';


//* Todo list
const todos = ref<Todo[]>([])
const selectedFilter = ref<FilterOption>('all')
const todoInfo = ref<TodoInfo>({
  all: 0,
  inWork: 0,
  completed: 0,
})

async function updateTodoList(filter?: FilterOption) {
  try {
    selectedFilter.value = filter ?? selectedFilter.value
    const resp = (await getTodos(selectedFilter.value)).data
    const fetchedTodos = resp.data

    todos.value = fetchedTodos
    if (resp.info) {
      todoInfo.value = resp.info
    }
  } catch (err) {
    console.log('err: ', err)
  }
}

let timerId: number

onActivated(() => {
  updateTodoList()
  timerId = setInterval(updateTodoList, 5000)
})
onDeactivated(() => clearInterval(timerId))
</script>

<template>
  <div class="todo-page">
    <NewTodoForm class="new-todo-form"
      @newTodo="updateTodoList"
    ></NewTodoForm>
    <TodoFilters class="todo-filters"
      :todoInfo="todoInfo"
      :selectedFilter="selectedFilter"
      @update:selectedFilter="updateTodoList"
    ></TodoFilters>
    <TodoList class="todo-list"
      :todos="todos"
      @update="updateTodoList"
    ></TodoList>

  </div>
</template>

<style scoped>


.todo-page {
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
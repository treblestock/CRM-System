<script setup lang="ts">
import type { FilterOption, Todo, TodoInfo } from '~/types';
import * as api from '~/api'
import { ref, watchEffect } from 'vue';

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

async function updateTodoList() {
  try {
    const resp = await api.getTodos(selectedFilter.value)
    const fetchedTodos = resp.data

    todos.value = fetchedTodos
    if (resp.info) {
      todoInfo.value = resp.info
    }
  } catch (err) {
    console.log('err: ', err)
  }
}

watchEffect(updateTodoList) // initial load + update todos on filter change
  // watchEffect checks deps synchronously before first await
</script>

<template>
  <div class="todo-page">
    <NewTodoForm class="new-todo-form"
      @newTodo="updateTodoList"
    ></NewTodoForm>
    <TodoFilters class="todo-filters"
      :todoInfo="todoInfo"
      v-model:selectedFilter="selectedFilter"
    ></TodoFilters>

    <TodoList class="todo-list"
      :todos="todos"
      @updateTodo="updateTodoList"
      @deleteTodo="updateTodoList"
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
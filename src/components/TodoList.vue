<script setup lang="ts">
import type { Todo } from '~/types';
import TodoItem from './TodoItem.vue';



const props = defineProps<{
  todos: Todo[]
  updateTodoList(...args: any): void
}>()



</script>

<template>
  <div class="todo-list">
    <TodoItem class="todo-item"
      v-for="todo in props.todos" :key="todo.id" 
      :="todo"
      :updateTodoList="updateTodoList"

    ></TodoItem>
  </div>
</template>

<style scoped>

</style>  
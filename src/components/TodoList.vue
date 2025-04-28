<script setup lang="ts">
import type { Todo } from '~/types';
import TodoItem from './TodoItem.vue';



const props = defineProps<{
  todos: Todo[]
}>()
const emit = defineEmits<{
  update: []
}>()

function handleTodoListChange() {
  emit('update')
}

</script>

<template>
  <div class="todo-list">
    <TodoItem class="todo-item"
      v-for="todo in props.todos" :key="todo.id" 
      :todo="todo"
      @updateTodo="handleTodoListChange"
      @deleteTodo="handleTodoListChange"
    ></TodoItem>
  </div>
</template>

<style scoped>

</style>  
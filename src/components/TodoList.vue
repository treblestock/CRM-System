<script setup lang="ts">
import type { Todo, TodoRequest } from '~/types';
import TodoItem from './TodoItem.vue';



const props = defineProps<{
  todos: Todo[]
}>()


const emit = defineEmits<{
  updateTodo: [id: Todo['id'], todoPatch: TodoRequest]
  deleteTodo: [id: Todo['id']]
}>()

function updateTodo(id: Todo['id'], todoPatch: TodoRequest) {
  emit('updateTodo', id, todoPatch)
}
function deleteTodo(id: Todo['id']) {
  emit('deleteTodo', id)
}


</script>

<template>
  <div class="todo-list">
    <TodoItem class="todo-item"
      v-for="todo in props.todos" :key="todo.id" 
      :="todo"
      @update="updateTodo"
      @delete="deleteTodo"
    ></TodoItem>
  </div>
</template>

<style scoped>

</style>  
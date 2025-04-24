<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import api from '~/api'
import NewTodoForm from '~/components/NewTodoForm.vue';
import TodoFilters from '~/components/TodoFilters.vue';
import TodoList from '~/components/TodoList.vue';
import type { Todo, TodoInfo } from '~/types';


//* Todo list
const todos = ref<Todo[]>([])

onMounted(updateTodoList)
async function updateTodoList() {
  try {
    const resp = await api.getTodos()
    const fetchedTodos = resp.data

    todos.value = fetchedTodos
    if (resp.info) todoInfo.value = resp.info
  } catch (err) {
    todos.value = []
    console.log(err)
  }
}

//* Todo filters
const todoInfo = ref<TodoInfo>({
  all: 0,
  inWork: 0,
  completed: 0,
})

const selectedFilter = ref<keyof TodoInfo>('all')
const filteredTodos = computed(() => {
  if (selectedFilter.value === 'all') return todos.value

  const shouldBeDone = selectedFilter.value === 'completed'
  return todos.value.filter(todo => todo.isDone === shouldBeDone)
})

</script>

<template>
  <div class="todo-page">
    <NewTodoForm class="new-todo-form"
      :updateTodoList="updateTodoList"
    ></NewTodoForm>
    <TodoFilters class="todo-filters"
      :all="todoInfo.all"
      :completed="todoInfo.completed"
      :inWork="todoInfo.inWork"

      v-model:selectedFilter="selectedFilter"
    ></TodoFilters>


    <TodoList class="todo-list"
      :todos="filteredTodos"
      :updateTodoList="updateTodoList"
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
<script setup lang="ts">
import { createTodo } from '~/api/todo';
import { Button, } from 'ant-design-vue'
import TodoTitleForm from './TodoTitleForm.vue';


const emit = defineEmits<{
  newTodo: []
}>()

async function handleCreateTodo(title: string) {
  try {
    const resp = (await createTodo({
      title: title,
      isDone: false,
    })).data

    if (!resp) {
      return
    }

    emit('newTodo')
  } catch(err) {
    console.log('err: ', err)
  } 
}
</script>

<template>
  <div class="new-todo-form">
    <TodoTitleForm class="form-title"
      id="newTodoForm"
      @submit="handleCreateTodo"
    />
    <Button class="submit-btn" 
      type="primary" 
      htmlType="submit"
      form="newTodoForm"
    >add</Button>
  </div>
</template>

<style scoped>
.new-todo-form {
  width: 100%;
  display: flex;
  align-items: baseline;
  gap: 20px;
  margin: 0;
}

.form-title {
  flex: 1 1 auto;
  border-bottom: 1px solid #ccc;
}

.submit-btn {
  flex: 0 0 auto;
}

</style>
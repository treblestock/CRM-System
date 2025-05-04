<script setup lang="ts">
import type { Todo } from '~/types/todo';
import { deleteTodo, editTodo } from '~/api/todo';
import { ref } from 'vue';

import { Button, Checkbox } from 'ant-design-vue'
import TodoTitleForm from './TodoTitleForm.vue';
import IconCancel from './icons/IconCancel.vue';
import IconSave from './icons/IconSave.vue';
import IconEdit from './icons/IconEdit.vue';
import IconDelete from './icons/IconDelete.vue';

const props = defineProps<{
  todo: Todo
}>()
const emit = defineEmits<{
  updateTodo: []
  deleteTodo: []
}>()


const newTitle = ref(props.todo.title)
const isEditingMode = ref(false)

async function handleToggleTodoStatus() {
  try {
    await editTodo(props.todo.id, { isDone: !props.todo.isDone})
    emit('updateTodo')
  } catch(err) {
    console.log('err: ', err)
  }
}

function handleStartTodoEditing() {
  newTitle.value = props.todo.title
  isEditingMode.value = true
}

function handleCancelTodoChange() {
  isEditingMode.value = false
  newTitle.value = props.todo.title
}

async function handleChangeTodoTitle(newTitle: string) {
  try {
    await editTodo(props.todo.id, { title: newTitle })
    emit('updateTodo')
  } finally {
    isEditingMode.value = false
  }
}

async function handleDeleteTodo() {
  try {
    await deleteTodo(props.todo.id)
    emit('deleteTodo')
  } catch(err) {
    console.log('err: ', err)
  }
}

</script>

<template>
  <div class="todo"
    :class="{'is-done': props.todo.isDone}"
  >
    <Checkbox class="todo-status"
      :checked="props.todo.isDone"
      @change="handleToggleTodoStatus"
    />

    <div class="todo-title">
      <div class="actual-todo-title"
        v-if="!isEditingMode"
      >{{ props.todo.title }}</div>
      
      <TodoTitleForm class="new-todo-title"
        v-else
        id="editTitleForm"
        :title="newTitle"
        @submit="handleChangeTodoTitle"
      />
    </div>

    <div class="todo-toolbar">
      <Button class="edit-btn"
        type="primary"
        v-if="!isEditingMode"
        @click="handleStartTodoEditing"
      >
        <IconEdit class="edit-btn" />
      </Button>

      <template v-else>
        <Button class="save-btn"
          form="editTitleForm"
          htmlType="submit"
        >
          <IconSave />
        </Button>

        <Button class="cancel-btn"
          @click="handleCancelTodoChange"
        >
          <IconCancel />
        </Button>
      </template>

      <Button class="delete-btn"
        @click="handleDeleteTodo"
        danger
        type="primary"
      >
        <IconDelete />
      </Button>
    </div>
  </div>
</template>

<style scoped>
.todo {
  display: flex;
  align-items: center;
  padding: 5px;
  gap: 10px;
}
.todo-status {
  flex: 0 0 auto;
  width: initial;
}
.todo-title {
  flex: 1 1 200px;
  min-width: 200px;


  .is-done & {
    text-decoration: line-through;
  }
}
.actual-todo-title {
}

.new-todo-title {
  
}

/* toolbar */
.todo-toolbar {
  flex: 0 0 auto;

  display: flex;
  align-items: center;
  gap: 10px;
}

.edit-btn {
  /* background: lightblue; */
}
.save-btn {
  background: green;
}
.cancel-btn {
  background: coral;
}
.delete-btn {
  /* background: red; */
}

</style>
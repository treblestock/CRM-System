<script setup lang="ts">
import type { Todo, TodoRequest } from '~/types';
import { deleteTodo, editTodo } from '~/api';
import { checkStringInLengthRange } from '~/utils';
import { nextTick, ref, useTemplateRef } from 'vue';

import { Input, Button } from 'ant-design-vue'
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
const HTMLNewTitleInput = useTemplateRef('HTMLNewTitle')
const isEditingMode = ref(false)

function handleStartTodoEditing() {
  newTitle.value = props.todo.title
  isEditingMode.value = true
  nextTick(() => HTMLNewTitleInput.value?.$el.focus() )
}


async function updateTodo(id: Todo['id'], todoPatch: TodoRequest) {
  if ('title' in todoPatch && !checkStringInLengthRange(todoPatch.title, 2, 64) ) {
    return
  }

  try {
    await editTodo(id, todoPatch)
    emit('updateTodo')
  } catch(err) {
    console.log('err: ', err)
  }
}

function handleChangeTodoTitle() {
  try {
    updateTodo(props.todo.id, {
      title: newTitle.value
    })
  } finally {
    isEditingMode.value = false
  }
}

function handleCancelTodoChange() {
  isEditingMode.value = false
  newTitle.value = props.todo.title
}

function handleToggleTodoStatus() {
  updateTodo(props.todo.id, {
    isDone: !props.todo.isDone
  })
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
    <Input class="todo-status"
      type="checkbox"
      :checked="props.todo.isDone"
      @input="handleToggleTodoStatus"
    />
    <div class="todo-title">
      <div class="actual-todo-title"
        v-if="!isEditingMode"
      >{{ props.todo.title }}</div>
      
      <form class="new-todo-title-from"
        v-else
        @submit.prevent="handleChangeTodoTitle"
      >
        <Input class="new-todo-title"
          type="text"
          :bordered="false"
          ref="HTMLNewTitle"
          v-model="newTitle"
        />
      </form>
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
          @click="handleChangeTodoTitle"
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
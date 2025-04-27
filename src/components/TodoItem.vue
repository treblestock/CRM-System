<script setup lang="ts">
import type { Todo, TodoRequest } from '~/types';
import * as api from '~/api';
import { checkIsValidTodoTitle } from '~/utils';
import { nextTick, ref, useTemplateRef } from 'vue';

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

function startTodoEditing() {
  newTitle.value = props.todo.title
  isEditingMode.value = true
  nextTick(() => HTMLNewTitleInput.value?.focus() )
}


async function updateTodo(id: Todo['id'], todoPatch: TodoRequest) {
  if ('title' in todoPatch && !checkIsValidTodoTitle(todoPatch.title) ) return

  try {
    await api.editTodo(id, todoPatch)
    emit('updateTodo')
  } catch(err) {
    console.log('err: ', err)
  }
}

function saveTodoTitle() {
  try {
    updateTodo(props.todo.id, {
      title: newTitle.value
    })
  } finally {
    isEditingMode.value = false
  }
}

function cancelTodoTitleChange() {
  isEditingMode.value = false
  newTitle.value = props.todo.title
}

function toggleTodoStatus() {
  updateTodo(props.todo.id, {
    isDone: !props.todo.isDone
  })
}

async function deleteTodo() {
  try {
    await api.deleteTodo(props.todo.id)
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
    <input type="checkbox" class="todo-status"
      :checked="props.todo.isDone"
      @input="toggleTodoStatus"
    >
    <div class="todo-title">
      <div class="actual-todo-title"
        v-if="!isEditingMode"
      >{{ props.todo.title }}</div>
      
      <form class="new-todo-title-from"
        v-else
        @submit.prevent="saveTodoTitle"
      >
        <input class="new-todo-title"
          type="text"
          ref="HTMLNewTitle"
          v-model="newTitle"
        >
      </form>
    </div>

    <div class="todo-toolbar">
      <button class="edit-btn"
        v-if="!isEditingMode"
        @click="startTodoEditing"
      >
        <IconEdit class="edit-btn" />
      </button>

      <template v-else>
        <button class="save-btn"
          @click="saveTodoTitle"
        >
          <IconSave />
        </button>

        <button class="cancel-btn"
          @click="cancelTodoTitleChange"
        >
          <IconCancel />
        </button>
      </template>

      <button class="delete-btn"
        @click="deleteTodo"
      >
        <IconDelete />
      </button>
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
}
.todo-title {
  flex: 1 1 auto;

  .is-done & {
    text-decoration: line-through;
  }
}

/* toolbar */
.todo-toolbar {
  flex: 0 0 auto;

  display: flex;
  align-items: center;
  gap: 10px;
}

.edit-btn {
  background: lightblue;
}
.save-btn {
  background: green;
}
.cancel-btn {
  background: coral;
}
.delete-btn {
  background: red;

}

</style>
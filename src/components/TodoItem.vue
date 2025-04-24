<script setup lang="ts">
import { nextTick, ref, useTemplateRef } from 'vue';
import type { Todo, TodoRequest } from '~/types';
import IconCancel from './icons/IconCancel.vue';
import IconSave from './icons/IconSave.vue';
import IconEdit from './icons/IconEdit.vue';
import IconDelete from './icons/IconDelete.vue';
import api from '~/api';
import { isValidTodoTitle } from '~/utils';


const props = defineProps<Todo & {
  updateTodoList(...args: any): void
}>()

const isEditingMode = ref(false)
const HTMLNewTitleInput = useTemplateRef('HTMLNewTitle')
const newTitle = ref(props.title)

function startTodoEditing() {
  newTitle.value = props.title
  isEditingMode.value = true
  nextTick(() => HTMLNewTitleInput.value?.focus() )
}

function saveTodoTitle() {
  updateTodo(props.id, {
    title: newTitle.value
  })
  isEditingMode.value = false
}
async function updateTodo(id: Todo['id'], todoPatch: TodoRequest) {
  if (typeof todoPatch.title === 'string' && !isValidTodoTitle(todoPatch.title) ) return

  const updatedTodo = await api.editTodo(id, todoPatch)
  if (updatedTodo) props.updateTodoList()
}
function cancelTodoTitleChange() {
  isEditingMode.value = false
  newTitle.value = props.title
}
function toggleTodoStatus() {

  updateTodo(props.id, {
    isDone: !props.isDone
  })
}
async function deleteTodo() {
  try {
    const resp = await api.deleteTodo(props.id)

    if (resp) props.updateTodoList()
  } catch(err) {
    console.log('err: ', err)
  }
}



</script>

<template>
  <div class="todo"
    :class="{'_is-done': props.isDone}"
  >
    <input type="checkbox" class="todo-status"
      :checked="props.isDone"
      @input="toggleTodoStatus"
    >
    <div class="todo-title">
      <div class="actual-todo-title"
        v-if="!isEditingMode"
      >{{ props.title }}</div>
      <input class="new-todo-title"
        v-else
        type="text"
        v-model="newTitle"
        ref="HTMLNewTitle"
      >
    </div>
    <div class="todo-toolbar">
      <div class="todo-toolbar-edit-group">
        <button class="edit-btn"
          v-if="!isEditingMode"
          @click="startTodoEditing"
        >
          <IconEdit class="edit-btn"></IconEdit>
        </button>

        <div class="save-or-cancel-change"
          v-else
        >
          <button class="save-btn"
            @click="saveTodoTitle"
          >
            <IconSave></IconSave>
          </button>
          <button class="cancel-btn"
            @click="cancelTodoTitleChange"
          >
            <IconCancel></IconCancel>
          </button>
        </div>

      </div>
      <button class="delete-btn"
        @click="deleteTodo"
      >
        <IconDelete></IconDelete>
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

  ._is-done & {
    text-decoration: line-through;
  }
}
.todo-toolbar {
  flex: 0 0 auto;

  display: flex;
  align-items: center;
  gap: 10px;
}
.todo-toolbar-edit-group {


}
.save-or-cancel-change {
  display: flex;
  align-items: center;
  gap: 10px;
}
.edit-btn {
  background: #0c3dc5;
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
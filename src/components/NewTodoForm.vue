<script setup lang="ts">
import * as api from '~/api';
import { checkIsValidTodoTitle } from '~/utils';
import { ref } from 'vue';


const emit = defineEmits<{
  newTodo: []
}>()

const title = ref<string>('')

const wasValidationFailed = ref(false)

async function onSubmit() {
  if (!checkIsValidTodoTitle(title.value)) {
    wasValidationFailed.value = true
    return
  }

  try {
    const resp = await api.createTodo({
      title: title.value,
      isDone: false,
    })

    if (!resp) return
    emit('newTodo')

    title.value = ''
    wasValidationFailed.value = false
  } catch(err) {
    console.log('err: ', err)
  }
}
</script>

<template>
  <form class="new-todo-form"
    @submit.prevent="onSubmit" 
  >
    <div class="todo-title">
      <input class="todo-title-input" 
        type="text" 
        v-model="title"
        placeholder="Task to be done..."
      >
    </div>
    <button class="submit-btn" 
      type="submit"
    >
      Add
    </button>


    <div class="error-msg"
      v-if="wasValidationFailed"
    >
      Поле обязательно для ввода и текст от 2 до 64 символов
    </div>
  </form>
</template>

<style scoped>

.new-todo-form {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 20px;

}
.todo-title {
  flex: 1 1 auto;
  font-size: 18px;

  padding-bottom: 2.5px;
  border-bottom: 1px solid #aaa;

}
.todo-title-input {
  background: none;
  border: none;
  outline: none;

  &:focus::placeholder {
    opacity: .6;
  }
}
.submit-btn {
  flex: 0 0 auto;
  background: lightblue;
}
.error-msg {
  flex: 0 0 100%;
  color: red;
}

</style>
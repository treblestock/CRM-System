<script setup lang="ts">
import * as api from '~/api';
import { checkIsValidTodoTitle } from '~/utils';
import { ref } from 'vue';
import { Button, Input } from 'ant-design-vue'


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
      <Input 
        :bordered="false"
        type="text"
        v-model="title"
        placeholder="Task to be done..."
      >
      </Input>
    </div>
    <Button class="submit-btn"
      type="primary"
      htmlType="submit"
    >add</Button>



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
}
.error-msg {
  flex: 0 0 100%;
  color: red;
}

</style>
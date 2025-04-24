<script setup lang="ts">
import { ref } from 'vue';
import api from '~/api';
import { isValidTodoTitle } from '~/utils';

const props = defineProps<{
  updateTodoList(...args: any): void
}>()



const title = ref<string>('')


const wasValidationFailed = ref(false)

async function onSubmit() {
  if (!isValidTodoTitle(title.value)) {
    wasValidationFailed.value = true
    return
  }

  try {
    const resp = await api.createTodo({
      title: title.value,
      isDone: false,
    })
    if (!resp) return

    title.value = ''
    wasValidationFailed.value = false

    props.updateTodoList()
  } catch(err) {
    console.log('err: ', err)
  }
}







</script>

<template>
  <form class="new-todo-form"
    @submit.prevent="onSubmit" 
  >
    <input class="todo-title" 
      type="text" 
      v-model="title"
      placeholder="Task to be done..."
    >
    <button class="submit-btn" 
      type="submit"
    >Add</button>


    <div class="error-msg"
      v-if="wasValidationFailed"
    >
      XXX
    </div>
  </form>
</template>

<style scoped>

.new-todo-form {
  display: flex;
  align-items: end;
  gap: 20px;

}
.todo-title {
  background: none;
  border: none;
  outline: none;
  font-size: 18px;

  padding-bottom: 5px;
  border-bottom: 1px solid #aaa;


  &:focus::placeholder {
    opacity: .6;
  }
}
.submit-btn {
  background: lightblue;
}
.error-msg {
  color: red;
}

</style>
<script setup lang="ts">
import type { Rule } from 'ant-design-vue/es/form';
import { ref, useTemplateRef } from 'vue'
import { Form, FormItem, Input } from 'ant-design-vue'
import type { FormExpose } from 'ant-design-vue/es/form/Form';

const props = defineProps<{
  title?: string
}>()


const emit = defineEmits<{
  submit: [title: string]
}>()



const FormComp = useTemplateRef('form')

const formState = ref({
  title: props.title || ''
})
const rules = ref<Record<string, Rule[]>>({
  title: [
    {required: true, message: "Поле обязательно для ввода", trigger: "change"},
    {min: 2, max: 64, message: "Длинна текста от 2 до 64 символов", trigger: "change"},
  ]
})

async function onSubmit() {
  emit('submit', formState.value.title)
  const formApi = FormComp.value as unknown as FormExpose
  formApi.resetFields()
}
</script>

<template>
  <Form class="new-todo-form"
    ref="form"
    @finish="onSubmit" 
    :model="formState" 
    :rules="rules"
  >
    <FormItem class="form-item" 
      name="title"
    >
      <Input class="input"
        :bordered="false" 
        type="text" 
        v-model:value="formState.title" 
        placeholder="Task to be done..." 
      />
    </FormItem>
  </Form>
</template>

<style scoped>
.new-todo-form {
}
.form-item {
  margin: 0;
}
.input {
  padding: 0;
}

</style>
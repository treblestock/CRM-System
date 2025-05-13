<script setup lang="ts">
import type { AuthData } from '~/types/user';
import type { RuleObject } from 'ant-design-vue/es/form';
import type { FormExpose } from 'ant-design-vue/es/form/Form';

import {Button, Checkbox, ConfigProvider, Form, FormItem, Input, Row } from 'ant-design-vue'
import { ref, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';


import useStoreAuth from '~/stores/auth'

const emit = defineEmits<{
  submit: [signinData: AuthData]
}>()

type FormState = {
  login: string
  password: string
  shouldRemember: boolean
}

const formState = ref<FormState>({
  login: '',
  password: '',
  shouldRemember: true,
})

const formComp = useTemplateRef('formComp')
const isInvalidCredentials = ref(false)

const router = useRouter()
const authStore = useStoreAuth()

const formRules = ref<Partial<Record<keyof FormState, RuleObject[] | RuleObject >> >({
  login: [
    {required: true, message: 'Поле обязательно для ввода', trigger: 'change'},
    {min: 2, max: 60, message: 'Логин от 1 до 60 символов', trigger: 'change'},
    {pattern: /^([A-z])+$/, message: 'Логин может состоять только из букв латинского алфавита'},
  ],
  password: [
    {required: true, message: 'Поле обязательно для ввода', trigger: 'change'},
    {min: 6, max: 60, message: 'Пароль от 6 до 60 символов', trigger: 'change'},
  ],
})




async function handleSignin() {
  const data = formState.value
  try {
    const resp = await authStore.signin({
      login: data.login,
      password: data.password,
    })
    if (resp.status === 401) {
      isInvalidCredentials.value = true
      return
    }

    if (resp.status === 200) {
      isInvalidCredentials.value = false
      emit('submit', data)
      const formApi = formComp.value as unknown as FormExpose
      formApi.resetFields()

      router.push({name: 'main'})
    }

  } catch(err) {
    console.log('err: ', err)
  } 
}

</script>

<template>
  <div class="sign-in-form">

    <div class="top-section">
      <div class="text-section">
        <h1 class="title">Login to your Account</h1>
        <div class="description">See what is going on with your business</div>
      </div>

      <ConfigProvider
        :theme="{token: {colorPrimary: '#7F265B'}}"
        >
          <Form class="form"
            ref="formComp"
            :model="formState"
            :rules="formRules"
            @finish="handleSignin"
          >
            <div class="error" v-if="isInvalidCredentials">Неверные логин или пароль</div>
            <FormItem class="input-group"
              label="Login" 
              :colon="false"
              name="login"
            >
              <Input class="input-group"
                v-model:value="formState.login"
                placeholder="User name"
              ></Input>
            </FormItem>

            <FormItem class="input-group"
              label="Password" 
              :colon="false"
              name="password"
            >
              <Input class="input-group"
                type="password"
                v-model:value="formState.password"
                placeholder="*********"
              ></Input>
            </FormItem>

            <Row class="remember-me-and-forgot-password"
              justify="space-between"
            >
              <FormItem class="form-item-checkbox"
                name="shouldRemember"
              >
                <Checkbox class="checkbox"
                  v-model:checked="formState.shouldRemember"
                >
                  <span class="checkbox-text">Remember me</span>
                </Checkbox>
              </FormItem>
              <RouterLink class="forgot-password-link"
                to="/"
              >Forgot Password?</RouterLink>
            </Row>

            <Button class="submit-btn"
              type="primary"
              block
              htmlType="submit"
            >Login</Button>

          </Form>
      </ConfigProvider>
    </div>

    <div class="not-registred">
      Not Registered Yet? 
      <RouterLink class="not-registred-link"
        :to="{name: 'signup'}"
      >Create an account</RouterLink>
    </div>
  </div>
</template>

<style scoped>

.sign-in-form {
  width: 420px;

  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.top-section {
  margin-bottom: 10px;
}
.text-section {
  margin: 0 auto;
  width: min-content;

  margin-bottom: 36px;
}
.title {
  text-wrap: nowrap;
  margin: 0 auto 10px;

  font-size: 36px;
  font-weight: 700;
  color: var(--color-grey);
}
.description {
  font-size: 16px;
  color: var(--color-grey);
}
.error {
  margin-top: 15px;
  color: red;
}

.form {
  margin: 0 auto;
}
.input-group {

  :deep(& label) {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-grey-3);
  }

  :deep(& .ant-row) {
    flex-wrap: wrap;
  }
  :deep(& .ant-col) {
    flex: 0 0 100%;
    text-align-last: left;
  }
}


.remember-me-and-forgot-password {
  margin-top: -16px;
  align-items: baseline;
  margin-bottom: 32px;
}

.form-item-checkbox {
  margin-bottom: 0;
}

.checkbox-text {
  font-size: 12px;
  font-weight: 400;
  color: #A1A1A1;
}
.forgot-password-link {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-primary);
}

.submit-btn {
  height: auto;
  padding: 10px;

  font-size: 18px;
  font-weight: 700;
}


.not-registred {
  margin: 0 auto;
  margin-top: auto;
  color: var(--color-grey-3);
}
.not-registred-link {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
}


</style>
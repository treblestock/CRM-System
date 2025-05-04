<script setup lang="ts">
import type { UserRegistration } from '~/types/user';
import type { RuleObject } from 'ant-design-vue/es/form';
import type { FormExpose } from 'ant-design-vue/es/form/Form';

import {Button, Checkbox, ConfigProvider, Form, FormItem, Input, Row } from 'ant-design-vue'
import { ref, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';
import useStoreAuth from '~/stores/auth'


const emit = defineEmits<{
  submit: [signupData: UserRegistration]
}>()


type FormState = {
  login: string
  username: string
  email: string
  phoneNumber: string
  password: string
  repeatPassword: string
}

const formState = ref<FormState>({
  login: '',
  email: '',
  phoneNumber: '',
  username: '',
  password: '',
  repeatPassword: '',
})
const shouldRemember = ref(false)

const errorMsg = ref('')

const formComp = useTemplateRef('formComp')

const router = useRouter()
const authStore = useStoreAuth()

const formRules = ref<Partial<Record<keyof FormState, RuleObject[] | RuleObject >> >({
  username: [
    {required: true, message: 'Поле обязательно для ввода', trigger: 'change'},
    {min: 1, max: 60, message: 'Логин от 1 до 60 символов', trigger: 'change'},
    {pattern: /^([A-z]|[А-я])+$/, message: 'Логин может состоять только из букв русского/латинского алфавита'},
  ],
  login: [
    {required: true, message: 'Поле обязательно для ввода', trigger: 'change'},
    {min: 2, max: 60, message: 'Логин от 1 до 60 символов', trigger: 'change'},
    {pattern: /^([A-z])+$/, message: 'Логин может состоять только из букв латинского алфавита'},
  ],
  password: [
    {required: true, message: 'Поле обязательно для ввода', trigger: 'change'},
    {min: 6, max: 60, message: 'Пароль от 6 до 60 символов', trigger: 'change'}
  ],
  repeatPassword: {
    validator: (_, value) => {
      return value === formState.value.password ? Promise.resolve() : Promise.reject()
    }, 
    message: 'Пароль должен совпадать'
  },
  email: [
    {required: true, message: 'Поле обязательно для ввода', trigger: 'change'},
    {type: 'email', message: 'Введите корректный email', trigger: 'change'},
  ],
  phoneNumber: [
    {pattern: /^\+?\d{11}$/, message: 'Введите корректный нормер телефона', trigger: 'change'}
  ],
})




async function handleSignup() {
  const formData = formState.value

  try {
    const resp = await authStore.signup({
      username: formData.username,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      login: formData.login,
      password: formData.password,
    })

    if (resp.status === 400) {
      errorMsg.value = 'Не правильные данные при вводе'
      return
    }
    if (resp.status === 409) {
      errorMsg.value = 'Логин или почта уже используются'
      return
    }

    if (resp.status === 201) {
      errorMsg.value = ''
      emit('submit', formState.value)
      const formApi = formComp.value as unknown as FormExpose
      formApi.resetFields()

      router.push({name: 'signin'})
    }
  } catch(err) {
    console.log('err: ', err)
  } 
}

</script>

<template>
  <div class="sign-up-form">
    <div class="top-section">
      <div class="text-section">
        <h1 class="title">Create an Account</h1>
        <div class="description">See what is going on with your business</div>
      </div>

      <ConfigProvider
        :theme="{token: {colorPrimary: '#7F265B'}}"
        >
          <Form class="form"
            ref="formComp"
            :model="formState"
            :rules="formRules"
            @finish="handleSignup"
          >
            <div class="error" v-if="errorMsg">{{ errorMsg }}</div>
            <FormItem class="input-group"
              label="User name" 
              :colon="false"
              name="username"
            >
              <Input class="input-group"
                v-model:value="formState.username"
                placeholder="User name"
              ></Input>
            </FormItem>

            <FormItem class="input-group"
              label="Login" 
              :colon="false"
              name="login"
            >
              <Input class="input-group"
                v-model:value="formState.login"
                placeholder="Login"
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

            <FormItem class="input-group"
              label="Repeat Password" 
              :colon="false"
              name="repeatPassword"
            >
              <Input class="input-group"
                type="password"
                v-model:value="formState.repeatPassword"
                placeholder="*********"
              ></Input>
            </FormItem>

            <FormItem class="input-group"
              label="Email" 
              :colon="false"
              name="email"
            >
              <Input class="input-group"
                v-model:value="formState.email"
                placeholder="awesome@gmail.com"
              ></Input>
            </FormItem>

            <FormItem class="input-group"
              label="Phone number" 
              :colon="false"
              name="phoneNumber"
            >
              <Input class="input-group"
                v-model:value="formState.phoneNumber"
                placeholder="+7"
                type="tel"
              ></Input>
            </FormItem>

            <Row class="remember-me-and-forgot-password"
              justify="space-between"
            >
              <FormItem class="form-item-checkbox"
                name="shouldRemember"
              >
                <Checkbox class="checkbox"
                  v-model:checked="shouldRemember"
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
            >Sign up</Button>

          </Form>
      </ConfigProvider>
    </div>

    <div class="not-registred">
      Already have an account? 
      <RouterLink class="not-registred-link"
        :to="{name: 'signin'}"
      >Login</RouterLink>
    </div>
  </div>
</template>

<style scoped>

.sign-up-form {
  width: 420px;

  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

}
.top-section {
  margin-bottom: 30px;
}
.text-section {
  width: min-content;
  margin: 0 auto;

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
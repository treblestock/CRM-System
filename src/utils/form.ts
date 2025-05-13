import type { RuleObject } from "ant-design-vue/es/form";

export const usernameValidationRule: RuleObject | RuleObject[] = [
  {required: true, message: 'Поле обязательно для ввода', trigger: 'change'},
  {min: 1, max: 60, message: 'Логин от 1 до 60 символов', trigger: 'change'},
  {pattern: /^([A-z]|[А-я]|\s)+$/, message: 'Логин может состоять только из букв русского/латинского алфавита'},
]
export const emailValidationRule: RuleObject | RuleObject[] = [
  {required: true, message: 'Поле обязательно для ввода', trigger: 'change'},
  {type: 'email', message: 'Введите корректный email', trigger: 'change'},
]
export const phoneNumberValidationRule: RuleObject | RuleObject[] = [
  {pattern: /^\+?\d{11}$/, message: 'Введите корректный нормер телефона', trigger: 'change'}
]
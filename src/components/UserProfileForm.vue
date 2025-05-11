<script setup lang="ts">
import {ref, computed, watch} from 'vue'
import { Form, FormItem, Input } from 'ant-design-vue';
import type { ProfileData } from '~/types/user';
import type { RuleObject } from 'ant-design-vue/es/form';
import { emailValidationRule, phoneNumberValidationRule, usernameValidationRule } from '~/utils/form';

const props = defineProps<{
  userProfileData: ProfileData
}>()

const emit = defineEmits<{
  submit: [updatedUserProfile: ProfileData]
}>()

const formState = ref<ProfileData>({ ...props.userProfileData })

const ruProfileDataLabel: Record<keyof ProfileData, string> = {
  username: 'Имя пользователя:',
  email: 'Почтовый адрес:',
  phoneNumber: 'Телефон:'
}

const rules = ref<Partial<Record<keyof ProfileData, RuleObject[] | RuleObject >> >({
  username: usernameValidationRule,
  email: emailValidationRule,
  phoneNumber: phoneNumberValidationRule,
})

function submit(userProfile: ProfileData) {
  const updatedValues: Partial<ProfileData> = userProfile
  if (props.userProfileData.username === userProfile.username) {
    delete updatedValues.username
  }
  if (props.userProfileData.email === userProfile.email) {
    delete updatedValues.email
  }
  if (props.userProfileData.phoneNumber === userProfile.phoneNumber) {
    delete updatedValues.phoneNumber
  }

  if (!Object.keys(updatedValues) ) {
    return
  }

  emit('submit', updatedValues as ProfileData)
}
</script>

<template>
  <Form class="user-profile"
    direction="vertical"
    :labelCol="{span: 9}"
    :rules="rules"
    :model="formState"
    @finish="submit"
  >
    <FormItem class="profile-record"
      name="username"
      :label="ruProfileDataLabel.username"
    >
      <Input class="input"
        v-model:value="formState.username"
      />
    </FormItem>
    <FormItem class="profile-record"
      name="email"
      :label="ruProfileDataLabel.email"
    >
      <Input class="input"
        v-model:value="formState.email"
      />
    </FormItem>
    <FormItem class="profile-record"
      name="phoneNumber"
      :label="ruProfileDataLabel.phoneNumber"
    >
      <Input class="input"
        v-model:value="formState.phoneNumber"
      />
    </FormItem>
  </Form>
</template>

<style scoped>
@import "~css/consts";

.user-profile {
}
.profile-record {
  margin-bottom: 10px;
}
.label {
}
.data {
}

:deep(.ant-input[disabled]) {
  background: #fff;
  color: inherit;
  cursor: auto;
}


</style>
<script setup lang="ts">
import type { Profile } from '~/types/user';
import { onMounted, ref } from 'vue';
import { Form, FormItem, Input } from 'ant-design-vue';
import useStoreAuth from '~/stores/auth'
import { getUserProfile } from '~/api/user';

const authStore = useStoreAuth()

type ProfileData = Pick<Profile, 'username' | 'email' | 'phoneNumber'>

const userData = ref<ProfileData>({
  username: '',
  email: '',
  phoneNumber: '',
})

const ruProfileDataLabel: Record<keyof ProfileData, string> = {
  username: 'Имя пользователя:',
  email: 'Почтовый адрес:',
  phoneNumber: 'Телефон:'
}

onMounted(async () => {
  try {
    const resp = await getUserProfile()

    if (resp.status === 200) {
      userData.value = {
        username: resp.data.username,
        email: resp.data.email,
        phoneNumber: resp.data.phoneNumber,
      }
    }
  } catch(err) {
    console.log('err: ', err)
  }
})

</script>

<template>
  <div class="user-profile-page">
    <div class="header">
      <RouterLink class="signout-link ant-btn"
        :to="{name: 'signin'}"
        @click="authStore.signout"
      >
        Выйти
      </RouterLink>
    </div>

    <Form class="user-profile"
      direction="vertical"
      :labelCol="{span: 9}"
    >
      <FormItem class="profile-record"
        name="username"
        :label="ruProfileDataLabel.username"
      >
        <Input class="input"
          disabled
          v-model:value="userData.username"
        />
      </FormItem>
      <FormItem class="profile-record"
        name="email"
        :label="ruProfileDataLabel.email"
      >
        <Input class="input"
          disabled
          v-model:value="userData.email"
        />
      </FormItem>
      <FormItem class="profile-record"
        name="phoneNumber"
        :label="ruProfileDataLabel.phoneNumber"
      >
        <Input class="input"
          disabled
          v-model:value="userData.phoneNumber"
        />
      </FormItem>
    </Form>
  </div>
</template>

<style scoped>
.user-profile-page {
  padding: 10px;
}
.user-profile {
}
.profile-record {
  margin-bottom: 10px;
}
.label {
}
.data {
}

.header {
  display: flex;
  justify-content: end;
  margin-bottom: 16px;
}

.signout-link {
  font-size: 14px;
  height: 32px;

  padding: 4px 15px;
  border-radius: 6px;
  background-color: #ffffff;
  border: 1px solid #d9d9d9;

  &:hover {
    color: #4096ff;
    border-color: #4096ff;
  }
}


:deep(.ant-input[disabled]) {
  background: #fff;
  color: inherit;
  cursor: auto;
}


</style>
<script setup lang="ts">
import { Form, FormItem, Input } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { getUserProfile } from '~/api/user';
import type { Profile } from '~/types/user';



type ProfileData = Pick<Profile, 'username' | 'email' | 'phoneNumber'>

const userData = ref<ProfileData>({
  username: '',
  email: '',
  phoneNumber: '',
})

const toRus: Record<keyof ProfileData, string> = {
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
    <Form class="user-profile"
      direction="vertical"
      :labelCol="{span: 9}"
    >
      <FormItem class="profile-record"
        name="username"
        :label="toRus.username"
      >
        <Input class="input"
          disabled
          v-model:value="userData.username"
        />
      </FormItem>
      <FormItem class="profile-record"
        name="email"
        :label="toRus.email"
      >
        <Input class="input"
          disabled
          v-model:value="userData.email"
        />
      </FormItem>
      <FormItem class="profile-record"
        name="phoneNumber"
        :label="toRus.phoneNumber"
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


:deep(.ant-input[disabled]) {
  background: #fff;
  color: inherit;
  cursor: auto;
}


</style>
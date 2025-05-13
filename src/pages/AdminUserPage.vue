<script setup lang="ts">
import { Button } from 'ant-design-vue';
import {ref, onMounted} from 'vue'
import { getUser, updateUser } from '~/api/admin';
import UserProfileForm from '~/components/UserProfileForm.vue';
import type { User } from '~/types/admin';
import type { ProfileData } from '~/types/user';


const props = defineProps<{
  id: User['id']
}>()

const userData = ref<User | null>(null)

const isEditing = ref(false)

async function fetchUserData () {
  try {
    const resp = await getUser(props.id)

    if (resp.status === 200) {
      userData.value = resp.data
    }
  } catch(err) {
    console.log('err: ', err)
  }
}

function handleStartEditing() {
  isEditing.value = true
}

function handleCancelChange() {
  isEditing.value = false
}

async function handleSubmit(userProfile: ProfileData) {
  try {
    const resp = await updateUser(props.id, userProfile)

    if (resp.status === 200) {
      fetchUserData()
    }
  } catch(err) {
    console.log('err: ', err)
  } finally {
    isEditing.value = false
  }
}

onMounted(fetchUserData)
</script>

<template>
  <div class="user-profile-page">
    <RouterLink class="back-to-user-list-link ant-btn"
      :to="{name: 'adminUserList'}"
    >
      Назад к списку пользователей
    </RouterLink>
    <UserProfileForm class="user-profile-form"
      v-if="userData"
      id="form"
      :disabled="!isEditing"
      :userProfileData="userData"
      @submit="handleSubmit"
      @cancel="handleCancelChange"
    />

    <Button class="save-btn"
      v-if="!isEditing"
      form="form"
      @click="handleStartEditing"
    >Редактировать</Button>
    <Button class="save-btn"
      v-else
      form="form"
      type="primary"
      htmlType="submit"
    >Сохранить</Button>

  </div>
</template>

<style scoped>
@import "~css/consts";

.user-profile-page {
}
.back-to-user-list-link {
  display: block;
  width: max-content;
  margin-left: auto;
  margin-bottom: 16px;
}

.user-profile-form {
  margin-bottom: 20px;
}
.save-btn {
  display: block;
  margin-left: auto;
}


</style>
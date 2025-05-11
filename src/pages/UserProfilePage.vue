<script setup lang="ts">
import type { ProfileData } from '~/types/user';
import { onMounted, ref } from 'vue';
import useStoreAuth from '~/stores/auth'
import { getUserProfile } from '~/api/user';
import UserProfileForm from '~/components/UserProfileForm.vue'

const authStore = useStoreAuth()


const userData = ref<ProfileData>({
  username: '',
  email: '',
  phoneNumber: '',
})

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

    <UserProfileForm class="user-profile-form"
      :userProfileData="userData"
    />
  </div>
</template>

<style scoped>
.user-profile-page {
  padding: 10px;
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
</style>
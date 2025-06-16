<script setup lang="ts">
import type { ProfileData } from '~/types/user';
import { onMounted, ref } from 'vue';
import useStoreAuth from '~/stores/auth'
import { getUserProfile } from '~/api/user';
import UserProfileForm from '~/components/UserProfileForm.vue'

const authStore = useStoreAuth()


const userProfile = ref<ProfileData>({
  username: '',
  email: '',
  phoneNumber: '',
})
const isProfileLoaded = ref(false)

onMounted(async () => {
  try {
    const resp = await getUserProfile()

    if (resp.status === 200) {
      userProfile.value = {
        username: resp.data.username,
        email: resp.data.email,
        phoneNumber: resp.data.phoneNumber,
      }
      
      isProfileLoaded.value = true
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
      v-if="isProfileLoaded"
      :userProfileData="userProfile"
      disabled
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

</style>
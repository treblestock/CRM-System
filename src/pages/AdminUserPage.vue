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



async function handleSubmit(userProfile: ProfileData) {
  try {
    const resp = await updateUser({
      id: props.id,
      patch: userProfile
    })

    if (resp.status === 200) {
      fetchUserData()
    }
  } catch(err) {
    console.log('err: ', err)
  }
}

onMounted(fetchUserData)
</script>

<template>
  <div class="user-profile-page">
    <UserProfileForm class="user-profile-form"
      v-if="userData"
      id="form"
      :userProfileData="userData"
      @submit="handleSubmit"
    />

    <Button class="save-btn"
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
.user-profile-form {
  margin-bottom: 20px;
}
.save-btn {
  display: block;
  margin-left: auto;
}


</style>
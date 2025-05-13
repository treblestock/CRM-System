<script setup lang="ts">
import { Button } from 'ant-design-vue';
import { blockUser, deleteUser, setUserRoles, unblockUser } from '~/api/admin';
import type { User } from '~/types/admin';
import type { Role } from '~/types/user';


const props = defineProps<{
  user: User
}>()

const emit = defineEmits<{
  updateUsers: []
}>()


async function handleToggleBlock() {
  try {
    const confirmMsg = props.user.isBlocked 
      ? 'Вы уверены, что хотите разблокировать пользователя: ' + props.user.username
      : 'Вы уверены, что хотите заблокировать пользователя: ' + props.user.username

    const confirmDelete = confirm(confirmMsg)

    if (!confirmDelete) {
      return 
    }

    const action = props.user.isBlocked ? unblockUser : blockUser

    const resp = await action(props.user.id)

    if (resp.status === 200) {
      emit('updateUsers')
    }
  } catch(err) {
    console.log('err: ', err)
  }
}

async function handleToggleAdmin() {
  try {
    const confirmMsg = props.user.roles.includes('ADMIN') 
      ? 'Вы уверены, что хотите лишить админства пользователя: ' + props.user.username
      : 'Вы уверены, что хотите сделать пользователя: ' + props.user.username

    const confirmDelete = confirm(confirmMsg)

    if (!confirmDelete) {
      return 
    }

    const roles: Role[] = props.user.roles.includes('ADMIN') 
      ? props.user.roles.filter(role => role !== 'ADMIN')
      : [...props.user.roles, 'ADMIN']

    const resp = await setUserRoles(props.user.id, {roles})

    if (resp.status === 200) {
      emit('updateUsers')
    }
  } catch(err) {
    console.log('err: ', err)
  }
}

async function handelDeleteUser() {
  try {
    const confirmDelete = confirm('Вы уверены, что хотите удалить пользователя: ' + props.user.username)

    if (!confirmDelete) {
      return 
    }

    const resp = await deleteUser(props.user.id)

    if (resp.status === 200) {
      emit('updateUsers')
    }
  } catch(err) {
    console.log('err: ', err)
  }
}


</script>

<template>
  <div class="user-actions-toolbar">
    <Button class="toggle-block-action"
      @click="handleToggleBlock"
    >
      {{ user.isBlocked ? 'разблокировать' : 'заблокировать' }}
    </Button>
    <Button class="toggle-block-action"
      @click="handleToggleAdmin"
    >
      {{ user.roles.includes('ADMIN') ? 'лишить админства' : 'сделать админом'}}
    </Button>
    <Button class="delete-user-action"
      @click="handelDeleteUser"
      type="primary"
      danger
    >
      удалить
    </Button>
  </div>
</template>

<style scoped>
@import "~css/consts";

.user-actions-toolbar {
  display: flex;
  gap: 10px;
}
.toggle-block-action {
}

</style>
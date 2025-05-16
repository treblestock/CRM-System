<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue';
import { Button, Dropdown, Menu, type ItemType } from 'ant-design-vue';
import type { MenuInfo, MenuItemType } from 'ant-design-vue/es/menu/src/interface';
import { computed } from 'vue';
import { blockUser, deleteUser, setUserRoles, unblockUser } from '~/api/admin';
import type { User } from '~/types/admin';
import type { Role } from '~/types/user';


const props = defineProps<{
  user: User
}>()

const emit = defineEmits<{
  updateUsers: []
}>()

//* Block 
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

//* Roles
const ruRoleLabel: Record<Role, string> = {
  ADMIN: 'админ',
  MODERATOR: 'модератор',
  USER: 'пользователь',
}

const rolesMenuOptions = computed<ItemType[]>(() => {
  const rolesToManage: Role[] = ['ADMIN', 'MODERATOR', 'USER']

  return rolesToManage.map(role => {
    return {
      key: role,
      label: `${props.user.roles.includes(role) ? '-' : '+'} ${ruRoleLabel[role]}`,
    } as MenuItemType
  })
})


async function handleRoleChange(item: MenuInfo) {
  try {
    const selectedRole = item.key as Role
    const actualRoles = props.user.roles
    const hasRole = actualRoles.includes(selectedRole)

    const updatedRoles: Role[] = hasRole
      ? actualRoles.filter(role => role !== selectedRole)
      : [...actualRoles, selectedRole]
    
    const confirmMsgAction = hasRole 
      ? `лишить роли "${ruRoleLabel[selectedRole]}" пользователя: ` 
      : `добавить роль "${ruRoleLabel[selectedRole]}" пользователю: `
    const confirmMsg = `Вы уверены, что хотите ${confirmMsgAction} ${props.user.username}`


    const confirmDelete = confirm(confirmMsg)

    if (!confirmDelete) {
      return 
    }

    const resp = await setUserRoles(props.user.id, {roles: updatedRoles})

    if (resp.status === 200) {
      emit('updateUsers')
    }
  } catch(err) {
    console.log('err: ', err)
  }
}


//* Delete
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

    <Dropdown class="roles-toolbar">
      <template #default>
        <Button class="roles-toolbar-btn">
          Роли
          <DownOutlined />
        </Button>
      </template>

      <template #overlay>
        <Menu class="roles-toolbar-roles-menu"
          :items="rolesMenuOptions"
          @click="handleRoleChange"
        />
      </template>
    </Dropdown>
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
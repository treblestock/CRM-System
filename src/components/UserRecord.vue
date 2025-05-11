<script setup lang="ts">
import Icon from '@ant-design/icons-vue';
import type { User, UsersTableColumn } from '~/types/admin';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons-vue'
import { Tag } from 'ant-design-vue';

const props = defineProps<{
  column: UsersTableColumn 
  user: User
}>()

</script>

<template>
  <span>
    
  <RouterLink class="user-profile-page-link"
    v-if="column.dataIndex === 'username'"
    :to="{ 
      name: 'adminUser',
      params: { id: user.id }
    }"
  >
    {{ user.username }}
  </RouterLink>
  <span class="user-email"
    v-else-if="column.dataIndex === 'email'"
  > 
    <Icon> 
      <MailOutlined></MailOutlined>
    </Icon>
    {{ user.email }}
  </span>
  <span class="user-phone"
    v-else-if="column.dataIndex === 'phoneNumber'"
  > 
    <Icon> 
      <PhoneOutlined></PhoneOutlined>
    </Icon>
    {{ user.phoneNumber }}
  </span>
  <span class="user-roles"
    v-else-if="column.dataIndex === 'roles'"
  > 
    <Tag v-for="role in user.roles" :key="role">
      {{ role }}
    </Tag>
  </span>
  <span class="user-block-status"
    v-else-if="column.dataIndex === 'isBlocked'"
  > 
    {{ user.isBlocked ? '+' : '-' }}
  </span>
  <span class="user-signup-date"
    v-else-if="column.dataIndex === 'date'"
  > 
    {{ new Date(user.date) }}
  </span>

  </span>

</template>

<style scoped>


</style>
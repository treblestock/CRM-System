<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router'
import useStoreAuth from '~/stores/auth'

import { LayoutSider, Menu, MenuItem } from 'ant-design-vue'
import { CheckSquareOutlined, UserOutlined } from '@ant-design/icons-vue'
import ChartIcon from '~/components/icons/ChartIcon.vue'

const authStore = useStoreAuth()

type SidebarPageLink = 'todoList' | 'userProfile' | 'adminUsersList'

const activeLinks = ref<[SidebarPageLink]>(['todoList'])

const route = useRoute()
watch(
  route,
  () => {
    activeLinks.value = [route.name as SidebarPageLink]
  },
  { immediate: true }
)



</script>

<template>
  <LayoutSider class="sidebar">
    <nav>
      <Menu v-model:selectedKeys="activeLinks">
        <MenuItem class="nav-item" key="todoList">
          <RouterLink class="link" :to="{ name: 'todoList' }">
            <CheckSquareOutlined /> Список задач
          </RouterLink>
        </MenuItem>

        <MenuItem class="nav-item" key="userProfile">
          <RouterLink class="link" :to="{ name: 'userProfile' }">
            <UserOutlined /> Личный кабинет
          </RouterLink>
        </MenuItem>

        <MenuItem class="nav-item" key="adminUsersList"
          v-if="authStore.isAdmin"
        >
          <RouterLink class="link" :to="{ name: 'adminUsersList' }">
            <ChartIcon /> Пользователи
          </RouterLink>
        </MenuItem>

      </Menu>

    </nav>

  </LayoutSider>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.link {}
</style>
<script setup lang="ts">
import { LayoutSider, Menu, MenuItem, } from 'ant-design-vue'
import { CheckSquareOutlined, UserOutlined } from '@ant-design/icons-vue'
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router'


type SidebarPageLink = 'TodoList' | 'UserProfile'
const activeLinks = ref<SidebarPageLink[]>(['TodoList'])

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
    <Menu
      v-model:selectedKeys="activeLinks"
    >
      <MenuItem class="nav-item"
        key="TodoList"
      >
        <RouterLink class="link"
        :to="{name: 'TodoList'}"
        >
          <CheckSquareOutlined /> список задач
        </RouterLink>
      </MenuItem>

      <MenuItem class="nav-item"
        key="UserProfile"
      >
        <RouterLink class="link"
        :to="{name: 'UserProfile'}"
        >
          <UserOutlined /> профиль
        </RouterLink>
      </MenuItem>

    </Menu>
      


    </LayoutSider>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.link {

}


</style>
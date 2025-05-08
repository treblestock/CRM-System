<script setup lang="ts">
import { ConfigProvider, Layout, LayoutContent } from 'ant-design-vue'
import AppSidebar from '~/components/AppSidebar.vue';


</script>

<template>
  <Layout class="page">
    <ConfigProvider :theme="{
      token: {colorPrimary: '#1677ff'}
    }">
      <LayoutContent class="content">
        <RouterView />
      </LayoutContent>
    </ConfigProvider>
    
    <AppSidebar />
  </Layout>
</template>

<style scoped>
.page {
  margin: 0 auto;
}

.content {}

.sidebar {
  background: none;
}
</style>
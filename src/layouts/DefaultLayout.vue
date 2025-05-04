<script setup lang="ts">
import { Layout, LayoutContent } from 'ant-design-vue'
import AppSidebar from '~/components/AppSidebar.vue';


</script>

<template>
  <Layout class="page">
    <LayoutContent class="content">
      <RouterView />
    </LayoutContent>
    
    <AppSidebar />
  </Layout>
</template>

<style scoped>
.page {
  max-width: 700px;
  margin: 0 auto;
}

.content {}

.sidebar {
  background: none;
}
</style>
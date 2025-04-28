<script setup lang="ts">
import { Layout, LayoutContent } from 'ant-design-vue'
import Sidebar from '~/components/Sidebar.vue';


</script>

<template>
  <Layout>
    <LayoutContent class="content">
      <RouterView></RouterView>
    </LayoutContent>
    <Sidebar />
  </Layout>
</template>

<style scoped>
.content {
}
.sidebar {
  background: none;
}


</style>
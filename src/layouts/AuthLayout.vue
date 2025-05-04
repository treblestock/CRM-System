<script setup lang="ts">
import illustration from '~/assets/img/auth/illustration.png'

</script>

<template>
  <div class="auth-page-layout">
    <div class="illustration">
      <img class="img"
        :src="illustration" 
        alt="decor illustration"
      >
    </div>

    <div class="content-wrapper">
      <RouterView class="content"/>
    </div>
  </div>
</template>

<style scoped>
.auth-page-layout {
  display: flex;
  height: 100vh;

  padding: 10px;
  padding-right: 0;
}
.illustration {
  flex: 0 1 auto;
  
  & .img {
    object-fit: cover;
    object-position: center;
    
    width: 100%;
    height: 100%;
  }
}
.content-wrapper {
  flex: 1 1 auto;

  display: flex;
  justify-content: center;
  align-items: center;
}


.content {
  width: 100%;
  height: 100%;

  overflow-y: auto;
  scrollbar-gutter: stable;
}

</style>
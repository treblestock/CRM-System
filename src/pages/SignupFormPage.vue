<script setup lang="ts">
import DecorImg from '~/assets/img/auth/decor.png'
import SignupForm from '~/components/SignupForm.vue';


</script>

<template>
  <div class="sign-up-form-page">
    <div class="decor-img">
      <img class="img"
        :src="DecorImg" 
        alt="decor image"
      >
    </div>
    <SignupForm class="sing-up-form"/>
  </div>
</template>

<style scoped>
.sign-up-form-page {
  padding: 20px;

  display: flex;
  flex-direction: column;
}
.decor-img {
  width: 420px;
  margin: 0 auto;

  & .img {
    width: 72px;
    margin-top: 40px;
    margin-bottom: 36px;
  }
}
.sing-up-form {
  flex: 1 1 auto;
}


</style>
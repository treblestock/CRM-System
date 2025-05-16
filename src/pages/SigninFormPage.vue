<script setup lang="ts">
import SigninForm from '~/components/SigninForm.vue';
import DecorImg from '~/assets/img/auth/decor.png'




</script>

<template>
  <div class="sign-in-form-page">
    <div class="decor-img">
      <img class="img"
        :src="DecorImg" 
        alt="decor image"
      >
    </div>
    <SigninForm class="sign-in-form"/>
  </div>
</template>

<style scoped>
.sign-in-form-page {
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
.sign-in-form {
  flex: 1 1 auto;
}


</style>
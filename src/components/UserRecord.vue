<script setup lang="ts">
import {ref, computed, watch} from 'vue'
import type { User } from '~/types/admin';


const props = defineProps<{
  user: User
}>()

</script>

<template>
  <div class="user">
    <div class="name">{{ user.id }}</div>
    <div class="name">| {{ user.username }}</div>
    <div class="name">| {{ user.date }}</div>
    <div class="name">| {{ user.email }}</div>
    <div class="name">| {{ user.isBlocked }}</div>
    <div class="name">| {{ user.roles }}</div>
    <div class="name">| {{ user.phoneNumber }}</div>
  </div>
</template>

<style scoped>
@import "~css/consts";


</style>
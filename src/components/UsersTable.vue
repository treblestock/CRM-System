<script setup lang="ts">
import {ref, computed, watch} from 'vue'
import type { User } from '~/types/admin';
import UserRecord from './UserRecord.vue';


const props = defineProps<{
  users: User[]
}>()

</script>

<template>
  <div class="table">
    <UserRecord class="user-record"
      v-for="user in users" :key="user.id" 
      :user="user"
    />
  </div>
</template>

<style scoped>
@import "~css/consts";

.user-record {
  display: flex;
  gap: 20px;

  margin-bottom: 20px;
}
</style>
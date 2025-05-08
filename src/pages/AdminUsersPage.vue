<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { getUsers } from '~/api/admin';
import UsersTable from '~/components/UsersTable.vue';
import type { User, UserFilters, UsersTableFilterOption } from '~/types/admin';


const users = ref<User[]>([])

const search = ref('')
const filterByBlockOption = ref<UsersTableFilterOption>('all')
const sortBy = ref<'none' | 'email' | 'username'>('none')
const sortOrder = ref<UserFilters['sortOrder']>('asc')
const limit = ref(20)
const offset = ref(0)

const usersTotalCount = ref(0)
const pages = computed(() => Math.ceil(usersTotalCount.value / limit.value) )

const userFilters = computed<UserFilters>(() => {
  const filters: UserFilters = {
    limit: limit.value,
    offset: offset.value
  }
  if (search.value) {
    filters.search = search.value
  }
  if (filterByBlockOption.value !== 'all') {
    filters.isBlocked = filterByBlockOption.value === 'isBlocked' ? true : false
  }
  if (sortBy.value !== 'none') {
    filters.sortBy = sortBy.value
    filters.sortOrder = sortOrder.value
  }

  return filters
})

async function fetchUsers() {
  try {
    const resp = await getUsers(userFilters.value)
    
    if (resp.status === 200) {
      users.value = resp.data.data
      usersTotalCount.value = resp.data.meta.totalAmount
    }
  } catch(err) {
    console.log('err: ', err)
  }
}

watch(userFilters, fetchUsers, {  
  immediate: true
})

</script>

<template>
  <div class="users">
    <div class="header">
      <h1 class="title">Пользователи</h1>
      <!-- <UsersTableToolbar /> -->
    </div>

    <UsersTable class="users-table" 
      :users="users"
    />
  </div>
</template>

<style scoped>


</style>
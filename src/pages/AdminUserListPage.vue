<script setup lang="ts">
import { Pagination } from 'ant-design-vue';
import { computed, ref, watch } from 'vue';
import { getUsers } from '~/api/admin';
import UsersTable from '~/components/UsersTable.vue';
import UsersTableToolbar from '~/components/UsersTableToolbar.vue';
import useDebouncedRef from '~/composables/useDebouncedRef';
import type { User, UserFilters, UsersTableFilterOption, UsersTableSortOption } from '~/types/admin';


const users = ref<User[]>([])

const search = useDebouncedRef('', 500)
const selectedFilter = ref<UsersTableFilterOption>('all')
const sortBy = ref<UsersTableSortOption>('none')
const sortOrder = ref<UserFilters['sortOrder']>('asc')
const limit = ref(20)
const offset = ref(0)

const usersTotalCount = ref(0)
const currentPage = computed({
  get: () => offset.value + 1,
  set: (value) => offset.value = value - 1,
})

const userFilters = computed<UserFilters>(() => {
  const filters: UserFilters = {
    limit: limit.value,
    offset: offset.value
  }
  if (search.value) {
    filters.search = search.value
  }
  if (selectedFilter.value !== 'all') {
    filters.isBlocked = selectedFilter.value === 'isBlocked' ? true : false
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
      users.value = resp.data.data || []
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
      <UsersTableToolbar class="users-table-toolbar"
        v-model:search="search"
        v-model:selectedFilter="selectedFilter"
      />
    </div>

    <UsersTable class="users-table" 
      :users="users"
      v-model:sortBy="sortBy"
      v-model:sortOrder="sortOrder"
      @updateUsers="fetchUsers"
    />
    <Pagination class="pagination"
      :total="usersTotalCount"
      :pageSize="limit"
      v-model:current="currentPage"
      hideOnSinglePage
    />
  </div>
</template>

<style scoped>
.users {
  font-family: 'Inter';

  border: 1px solid #E4E4E4;
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: end;

  margin-bottom: 16px;
}
.title {
  font-size: 20px;
  line-height: 1.2;
  font-weight: 500;
}
.users-table {
  margin-bottom: 20px;
}
.pagination {
  text-align: right;
}



</style>
<script setup lang="ts">
import { Form, FormItem } from 'ant-design-vue';
import type { UsersTableFilterOption } from '~/types/admin';
import UsersSearch from './UsersSearch.vue';
import UsersFilter from './UsersFilter.vue';


const props = defineProps<{
  search: string
  selectedFilter: UsersTableFilterOption
}>()

const emit = defineEmits<{
  'update:search': [search: string]
  'update:selectedFilter': [selectedFilter: UsersTableFilterOption]
}>()

function handleUpdateSearch(search: string) {
  emit('update:search', search)
}
function handleUpdateFilter(selectedFilter: UsersTableFilterOption) {
  emit('update:selectedFilter', selectedFilter)
}

</script>

<template>
  <div class="users-table-toolbar">
    <Form class="search-form">
      <FormItem class="search-form-item">
        <UsersSearch 
          :search="props.search"
          @search="handleUpdateSearch"
        />
      </FormItem>
      <FormItem class="search-form-item">
        <UsersFilter class="users-filter"
          :selectedFilter="selectedFilter"
          @selectedFilter="handleUpdateFilter"
        />
      </FormItem>
    </Form>
  </div>
</template>

<style scoped>
@import "~css/consts";

.search-form {
  display: flex;
  gap: 16px;
}
.search-form-item {
  margin-bottom: 0;
}
.users-filter {
  width: 250px;
}

</style>
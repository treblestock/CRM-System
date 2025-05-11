<script setup lang="ts">
import { Select } from 'ant-design-vue';
import type { DefaultOptionType } from 'ant-design-vue/es/vc-cascader';
import { ref } from 'vue';
import type { UsersTableFilterOption } from '~/types/admin';


const props = defineProps<{
  selectedFilter: UsersTableFilterOption
}>()

const emit = defineEmits<{
  selectedFilter: [value: UsersTableFilterOption]
}>()


type SelectOption = DefaultOptionType & {
  value: UsersTableFilterOption
}
const ruFilterOptionLabel: Record<UsersTableFilterOption, string> = {
  all: 'Все пользователи',
  isBlocked: 'только заблокированные пользователи',
  isNotBlocked: 'только активные пользователи'
}
const options = ref<SelectOption[]>([
  {
    value: 'all',
    label: ruFilterOptionLabel.all,
  },
  {
    value: 'isBlocked',
    label: ruFilterOptionLabel.isBlocked,
  },
  {
    value: 'isNotBlocked',
    label: ruFilterOptionLabel.isNotBlocked,
  },
])



function handleChangeFilter(selectedFilter: UsersTableFilterOption) {
  emit('selectedFilter', selectedFilter)
}

</script>

<template>
  <Select class="users-filter"
    placeholder="foo"
    :value="selectedFilter"
    :options="options"
    @change="(handleChangeFilter as Function)"
  />

</template>

<style scoped>
@import "~css/consts";


</style>
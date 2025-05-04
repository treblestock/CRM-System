<script setup lang="ts">
import type { FilterOption, TodoInfo } from '~/types/todo';
import { Menu, type MenuProps } from 'ant-design-vue'
import { computed, ref, } from 'vue';
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface';

const props = defineProps<{
  todoInfo: TodoInfo
  selectedFilter: FilterOption
}>()
const emit = defineEmits<{
  'update:selectedFilter': [selectedFilter: FilterOption]
}>()

const ruFilterLabel: Record<FilterOption, string> = {
  all: 'Все',
  completed: 'Сделано',
  inWork: 'В работе',
}

const selectedMenuOptions = ref<FilterOption[]>(['all'])
const menuFilters = computed<MenuProps['items']>(() => [
  {
    key: 'all',
    label: `${ruFilterLabel.all} (${props.todoInfo.all})`,
  },
  {
    key: 'inWork',
    label: `${ruFilterLabel.inWork} (${props.todoInfo.inWork})`,
  },
  {
    key: 'completed',
    label: `${ruFilterLabel.completed} (${props.todoInfo.completed})`,
  },
])


function handleFilterChange(event: MenuInfo) {
  const filter = event.key as FilterOption
  emit('update:selectedFilter', filter)
}
</script>

<template>
  <nav class="todo-filters-nav">
    <Menu class="filter-options"
      mode="horizontal" 
      :items="menuFilters" 
      v-model:selectedKeys="selectedMenuOptions" 
      @click="handleFilterChange"
    />
  </nav>
</template>

<style scoped>
.filter-options {
  justify-content: space-around;

  &:before {
    display: none;
  }
}
</style>
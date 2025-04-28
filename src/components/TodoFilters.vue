<script setup lang="ts">
import type { FilterOption, TodoInfo } from '~/types';

const props = defineProps<{
  todoInfo: TodoInfo
  selectedFilter: FilterOption
}>()
const emit = defineEmits<{
  'update:selectedFilter': [selectedFilter: FilterOption]
}>()

const toRus: Record<FilterOption, string> = {
  all: 'Все',
  completed: 'Сделано',
  inWork: 'В работе',
}

function handleFilterChange(event: Event) {
  const target = event.target as HTMLElement
  const newFilter = target.dataset.filterValue as FilterOption
  emit('update:selectedFilter', newFilter)
}
</script>

<template>
  <nav class="todo-filters-nav">
    <ul class="filter-options">
      
      <li class="filter-option" 
        :class="{'selected': selectedFilter === 'all' }" 
      >
        <button class="filter-button" 
          data-filter-value="all"
          @click="handleFilterChange"
        >
          {{ toRus.all }} ({{ props.todoInfo.all }})
        </button>
      </li>

      <li class="filter-option" 
        :class="{'selected': selectedFilter === 'inWork' }" 
      >
        <button class="filter-button" 
          data-filter-value="inWork"
          @click="handleFilterChange"
        >
          {{ toRus.inWork }} ({{ props.todoInfo.inWork }})
        </button>
      </li>
      
      <li class="filter-option" 
        :class="{'selected': selectedFilter === 'completed' }" 
      >
        <button class="filter-button" 
          data-filter-value="completed"
          @click="handleFilterChange"
        >
          {{ toRus.completed }} ({{ props.todoInfo.completed }})
        </button>
      </li>

    </ul>
  </nav>
</template>

<style scoped>
.filter-options {
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 0;
}

.filter-option {
  flex: 1 1 auto;
  list-style: none;
}

.filter-button {
  text-wrap: nowrap;
  border: none;

  &:focus {
    outline: none;
    text-decoration: underline;
  }

  .selected & {
    color: #4ba8f0;
  }
}


</style>
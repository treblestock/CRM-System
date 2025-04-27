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

</script>

<template>
  <nav class="todo-filters-nav">
    <ul class="filter-options">
      
      <li class="filter-option" 
        :class="{'selected': selectedFilter === 'all' }" 
      >
        <button class="filter-button" @click="() => emit('update:selectedFilter', 'all')">
          {{ toRus.all }} ({{ props.todoInfo.all }})
        </button>
      </li>

      <li class="filter-option" 
        :class="{'selected': selectedFilter === 'inWork' }" 
      >
        <button class="filter-button" @click="() => emit('update:selectedFilter', 'inWork')">
          {{ toRus.inWork }} ({{ props.todoInfo.inWork }})
        </button>
      </li>
      
      <li class="filter-option" 
        :class="{'selected': selectedFilter === 'completed' }" 
      >
        <button class="filter-button" @click="() => emit('update:selectedFilter', 'completed')">
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
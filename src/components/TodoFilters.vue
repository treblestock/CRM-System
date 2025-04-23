<script setup lang="ts">
import type { TodoInfo } from '~/types';

type FilterOption = keyof TodoInfo

// 1) 3.4+ style 
const props = defineProps<TodoInfo>()
const selectedFilter = defineModel<FilterOption>('selectedFilter', {required: true})

//* 2) Old style 

// import { computed } from 'vue';
// const props = defineProps<TodoInfo & {selectedFilter: FilterOption}>()
// const emit = defineEmits<{
//   'update:selectedFilter': [selectedFilter: FilterOption]
// }>()

// const _selectedFilter = computed<FilterOption>({
//   get: () => props.selectedFilter,
//   set: (value) => emit('update:selectedFilter', value)
// })

</script>

<template>
  <form class="todo-filters">
    <label class="filter-option"
      :class="{'_selected-filter': selectedFilter === 'all' }"
      tabindex="0"
    >
      <div class="filter-option-text">Все ({{ props.all }})</div>
      <input class="filter-radio _hidden"
        type="radio"
        name="selectedFilter"
        value="all"
        v-model="selectedFilter"
      >
        
    </label>
    <label class="filter-option"
      :class="{'_selected-filter': selectedFilter === 'inWork' }"
      tabindex="0"
    >
      <div class="filter-option-text">В работе ({{ props.inWork }})</div>
      <input class="filter-radio _hidden"
        name="selectedFilter"
        type="radio"
        value="inWork"
        v-model="selectedFilter"
      >
    </label>
    <label class="filter-option"
      :class="{'_selected-filter': selectedFilter === 'completed' }"
      tabindex="0"
    >
      <div class="filter-option-text">Сделано ({{ props.completed }})</div>
      <input class="filter-radio _hidden"
        name="selectedFilter"
        type="radio"
        value="completed"
        v-model="selectedFilter"
      >
    </label>
    
  </form>
</template>

<style scoped>
.todo-filters {
  display: flex;
  gap: 20px;
}
.filter-option {
  
}
.filter-option-text {
  font-weight: bold;
}
.filter-radio {
  &:focus {
    outline: 1px solid #eee;
  }
}
._selected-filter {
  color: #4ba8f0;
}
._hidden {
  width: 0;
  height: 0;
  opacity: 0;
  position: absolute;
}


</style>
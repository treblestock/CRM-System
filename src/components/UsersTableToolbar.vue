<script setup lang="ts">
import {ref, computed, watch} from 'vue'
import type { UserFilters } from '~/types/admin';


const props = defineProps<{
  search: string
  selectedFilter?: boolean
}>()

const emit = defineEmits<{
  submit: [filters: Pick<UserFilters, 'search' | 'isBlocked'>]
}>()

</script>

<template>
  
</template>

<style scoped>
@import "~css/consts";


</style>
<script setup lang="ts">
import { InputSearch } from 'ant-design-vue';
import {ref, computed, watch} from 'vue'


const props = defineProps<{
  search: string
}>()

const emit = defineEmits<{
  search: [value: string]
}>()

function handleUpdateSearch(search: string) {
  emit('search', search)
}

</script>

<template>
  <InputSearch class="user-search"
    :value="search"
    @update:value="handleUpdateSearch"
    placeholder="Поиск по имени или email"
  />
</template>

<style scoped>
@import "~css/consts";


</style>
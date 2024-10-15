<template>
  <ul class="buttons-list">
    <li v-for="button in buttons" :key="button.id" class="buttons-list__item">
      <button
        :class="year === button.year ? 'active' : ''"
        @click="$emit('customClick', button.year)"
      >
        {{ button.text }}
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { type Button } from '../types'

defineProps<{
  year: number
  buttons: Array<Button>
}>()

defineEmits<{
  (e: 'customClick', val: number): void
}>()
</script>

<style lang="scss" scoped>
.buttons-list {
  display: flex;
  gap: 30px;
  margin: 0;
  padding: 0;
  list-style: none;

  & > * {
    flex: 1;
  }

  button {
    width: 100%;
    cursor: pointer;

    &.active {
      background-color: chocolate;
    }
  }
}
</style>

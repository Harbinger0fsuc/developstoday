<template>
  <ul class="holidays-list">
    <li
      v-for="(holiday, index) in holidays"
      :key="index"
      class="holidays-list__item"
    >
      <h2 v-if="holiday.name" class="holidays-list__name">
        {{ holiday.name }}
      </h2>
      <span v-if="holiday.date" class="holidays-list__date"
        >Date: {{ holiday.date }}</span
      >
      <span v-if="holiday.types" class="holidays-list__type"
        >Type: {{ holiday.types[0] }}</span
      >
    </li>
  </ul>
</template>

<script setup lang="ts">
import { type HolidayFull } from '../types'

defineProps<{
  holidays: Array<HolidayFull>
}>()
</script>

<style lang="scss" scoped>
.holidays-list {
  padding: 0;
  margin: 0 0 50px;
  list-style: none;

  &__item {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid black;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__name {
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>

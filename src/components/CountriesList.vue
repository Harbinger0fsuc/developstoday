<template>
  <ul class="countries-list">
    <li
      v-for="country in countries"
      :key="country.countryCode"
      class="countries-list__item"
    >
      <CountryCard :country="country" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { type Country } from '../types'

import CountryCard from './CountryCard.vue'

defineProps<{
  countries: Array<Country>
}>()
</script>

<style lang="scss" scoped>
.countries-list {
  margin: 0;
  padding: 0;
  list-style: none;

  &__item {
    margin-bottom: 20px;

    &:last-child {
      margin: 0;
    }
  }
}
</style>

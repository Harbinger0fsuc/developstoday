<template>
  <div class="countries-list-random">
    <h3 class="countries-list-random__title">{{ title }}</h3>

    <ul class="countries-list-random__itself">
      <li v-for="(country, index) in countries" :key="index">
        <CountryCardRandom :country="country" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { type CountryFull } from '../types'
import CountryCardRandom from './CountryCardRandom.vue'

defineProps<{
  title: string
  countries: Array<CountryFull>
}>()
</script>

<style lang="scss" scoped>
.countries-list-random {
  &__title {
    margin-top: 0;
    margin-bottom: 20px;
  }

  &__itself {
    padding: 0;
    margin: 0;
    list-style: none;

    & > * {
      margin-bottom: 30px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>

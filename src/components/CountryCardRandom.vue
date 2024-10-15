<template>
  <article class="country-card-random">
    <h2 v-if="country.name" class="country-card-random__country">
      <RouterLink :to="`/countries/${country.countryCode}`">{{
        country.name
      }}</RouterLink>
    </h2>
    <span v-if="nextHolidayItself" class="country-card-random__holiday"
      >Next holiday: {{ nextHolidayItself.name }}</span
    >
    <span v-if="nextHolidayItself" class="country-card-random__date"
      >Next holiday's date: {{ nextHolidayItself.date }}</span
    >
  </article>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { type CountryFull, type Holiday } from '../types'

const props = defineProps<{
  country: CountryFull
}>()

const nextHoliday = [...props.country.holiday]
const nextHolidaySorted = nextHoliday.sort(
  (a: Holiday, b: Holiday) =>
    new Date(b.date).valueOf() - new Date(a.date).valueOf(),
)

const nextHolidayItself: Holiday = nextHolidaySorted[0]
</script>

<style lang="scss" scoped>
.country-card-random {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1.5px solid chartreuse;

  & > * {
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__country {
    margin-top: 0;
  }
}
</style>

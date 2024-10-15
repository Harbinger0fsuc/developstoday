<template>
  <article class="country-card">
    <h2 v-if="country.name" class="country-card__name">
      <RouterLink
        :to="`/countries/${country.countryCode}`"
        class="country-card__link"
        >{{ country.name }}</RouterLink
      >
    </h2>
  </article>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { type Country } from '../types'

defineProps<{
  country: Country
}>()
</script>

<style lang="scss" scoped>
.country-card {
  & > * {
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__name {
    margin-top: 0;
  }

  &__link {
    display: block;
    border: 1px solid black;
    padding: 25px;
    color: currentColor;
    text-decoration: none;
    text-align: center;
  }
}
</style>

<template>
  <div class="search-form">
    <label for="search" class="search-form__label">Search</label>
    <input
      id="search"
      type="search"
      class="search-form__input"
      placeholder="Type a country to search"
      @input="customSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits(['customSearch'])

const customSearch = (e: Event) => {
  emit('customSearch', (e.target as HTMLInputElement).value)
}

defineProps<{ searchQuery: string }>()
</script>

<style lang="scss" scoped>
.search-form {
  margin-bottom: 40px;

  &__label {
    display: block;
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  &__input {
    width: 100%;
    padding: 20px 25px;
    font-weight: 700;

    &::placeholder {
      color: currentColor;
    }
  }
}
</style>

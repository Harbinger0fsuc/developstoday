<template>
  <main>
    <section class="not-found">
      <div class="container">
        <h1>Page not found</h1>
        <RouterLink to="/">Back to homepage</RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped>
.not-found {
  padding-top: 60px;
  padding-bottom: 60px;
}
</style>

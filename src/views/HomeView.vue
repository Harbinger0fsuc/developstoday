<template>
  <main>
    <section class="section-main">
      <div class="container">
        <div class="section-main__inner">
          <div class="section-main__main">
            <!-- Search Form Component -->
            <SearchForm
              :search-query="searchQuery"
              @customSearch="(val: string) => (searchQuery = val)"
            />

            <!-- CountriesList Component -->
            <CountriesList :countries="countriesFiltered" />
          </div>
          <div class="section-main__secondary">
            <!-- CountriesListRandom Component -->
            <CountriesListRandom
              :countries="countriesRandom"
              title="Random Countries Widget"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import CountriesList from '../components/CountriesList.vue'
import SearchForm from '../components/SearchForm.vue'
import CountriesListRandom from '../components/CountriesListRandom.vue'

import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import { type Country, type CountryFull } from '../types'

const isLoading = ref<boolean>(true)
const countries = ref<Array<Country>>([])
const searchQuery = ref<string>('')
const countriesRandom = ref<Array<CountryFull>>([])

const countriesFiltered = computed<Array<Country>>(() => {
  return countries.value.filter(country =>
    country.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const getCountries = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/AvailableCountries`,
    )

    const { data } = response
    countries.value = data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.status)
      console.error(err.response)
    } else {
      console.error(err)
    }
  } finally {
    isLoading.value = false
  }
}

const getRandomCountries = async (to: number = 3) => {
  const arrayOfRandomCountries: Array<Country> = []
  let i: number = 0

  while (i < to) {
    const country =
      countries.value[Math.floor(Math.random() * countries.value.length) + 1]

    if (!arrayOfRandomCountries.length) {
      arrayOfRandomCountries.push(country)
    } else {
      if (
        arrayOfRandomCountries.some(
          el => el.countryCode !== country.countryCode,
        )
      ) {
        arrayOfRandomCountries.push(country)
      }
    }
    i++
  }

  const randomCountriesWithEvent: Array<CountryFull> = []

  for (let j: number = 0; j < arrayOfRandomCountries.length; j++) {
    const { countryCode, name } = arrayOfRandomCountries[j]

    try {
      const { data: holiday } = await axios.get(
        `${import.meta.env.VITE_API_URL}/NextPublicHolidays/${countryCode}`,
      )

      const countryObj: CountryFull = {
        countryCode,
        name,
        holiday,
      }

      randomCountriesWithEvent.push(countryObj)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status)
        console.error(error.response)
      } else {
        console.error(error)
      }
    }
  }

  countriesRandom.value = randomCountriesWithEvent
}

onMounted(async () => {
  await getCountries()
  await getRandomCountries()
})
</script>

<style scoped lang="scss">
.section-main {
  padding-top: 60px;
  padding-bottom: 60px;

  &__inner {
    display: flex;
    gap: 50px;
  }

  &__main,
  &__secondary {
    flex: 1;
  }
}
</style>

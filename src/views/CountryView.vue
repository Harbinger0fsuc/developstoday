<template>
  <main>
    <section class="single-country">
      <div class="container">
        <RouterLink to="/">Go back to all countries</RouterLink>

        <h1 v-if="countryInfo.officialName" class="single-country__title">
          {{ countryInfo.officialName }}
        </h1>

        <!-- HolidaysList Component -->
        <HolidaysList :holidays="holidays" :year="year" />

        <!-- ButtonsList Component -->
        <ButtonsList
          :year="year"
          :buttons="buttons"
          @custom-click="val => (year = val)"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { type CountryShort, type HolidayFull, type Button } from '../types'
import HolidaysList from '@/components/HolidaysList.vue'
import ButtonsList from '@/components/ButtonsList.vue'

const { id } = useRoute().params
const year = ref<number>(new Date().getFullYear())
const countryInfo = ref<CountryShort>({ officialName: '' })
const isLoading = ref<boolean>(true)
const holidays = ref<Array<HolidayFull>>([])
const isLoadingHolidays = ref<boolean>(true)

const buttons = ref<Array<Button>>([
  {
    id: 1,
    year: 2020,
    text: '2020',
  },
  {
    id: 2,
    year: 2021,
    text: '2021',
  },
  {
    id: 3,
    year: 2022,
    text: '2022',
  },
  {
    id: 4,
    year: 2023,
    text: '2023',
  },
  {
    id: 5,
    year: 2024,
    text: '2024',
  },
  {
    id: 5,
    year: 2025,
    text: '2025',
  },
  {
    id: 6,
    year: 2026,
    text: '2026',
  },
  {
    id: 7,
    year: 2027,
    text: '2027',
  },
  {
    id: 8,
    year: 2028,
    text: '2028',
  },
  {
    id: 9,
    year: 2029,
    text: '2029',
  },
  {
    id: 10,
    year: 2030,
    text: '2030',
  },
])

const getCountryInfo = async () => {
  try {
    const { data: info } = await axios.get(
      `${import.meta.env.VITE_API_URL}/CountryInfo/${id}`,
    )

    countryInfo.value = info
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

const getHolidays = async () => {
  try {
    const { data: holidaysInfo } = await axios.get(
      `${import.meta.env.VITE_API_URL}/PublicHolidays/${year.value}/${id}`,
    )

    holidays.value = holidaysInfo
    console.log(holidaysInfo)
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.status)
      console.error(err.response)
    } else {
      console.error(err)
    }
  } finally {
    isLoadingHolidays.value = false
  }
}

onMounted(async () => {
  await getCountryInfo()
  await getHolidays()
})

watch(year, getHolidays)
</script>

<style lang="scss" scoped>
.single-country {
  padding-top: 60px;
  padding-bottom: 60px;

  &__title {
    margin-bottom: 60px;
  }
}
</style>

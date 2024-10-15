export interface Country {
  countryCode: string
  name: string
}

export interface CountryFull {
  countryCode: string
  name: string
  holiday: []
}

export interface CountryShort {
  officialName: string
}

export interface Holiday {
  date: string
  name: string
}

export interface HolidayFull extends Holiday {
  types: string[]
}

export interface Button {
  id: number
  year: number
  text: string
}

import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import { athletes as initialAthletes } from '@/data/athletes'
import type { Athlete } from '@/types/athlete'

const STORAGE_KEY = 'tracklab-athletes'

export const useAthleteStore = defineStore('athletes', () => {
  const savedAthletes = localStorage.getItem(STORAGE_KEY)
  const athletes = ref<Athlete[]>(
    savedAthletes
      ? JSON.parse(savedAthletes)
      : [...initialAthletes]
  )

  function getAthleteById(id: number) {
    return athletes.value.find((athlete) => athlete.id === id)
  }

  function addAthlete(athlete: Athlete) {
    athletes.value.push(athlete)
  }

  function removeAthlete(id: string) {
    athletes.value = athletes.value.filter(
      athlete => athlete.id !== id
    )
  }
  function resetAthletes() {
    athletes.value = [...initialAthletes]
    localStorage.removeItem(STORAGE_KEY)
  }

  function updateAthlete(updatedAthlete: Athlete) {
    const index = athletes.value.findIndex(
      athlete => athlete.id === updatedAthlete.id
    )

    if (index !== -1) {
      athletes.value[index] = updatedAthlete
    }
  }

  watch(
    athletes,
    (newAthletes) => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(newAthletes)
      )
    },
    { deep: true }
  )

  return {
    athletes,
    getAthleteById,
    addAthlete,
    removeAthlete,
    resetAthletes,
    updateAthlete,
  }
})

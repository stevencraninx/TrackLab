import { defineStore } from 'pinia'
import { ref } from 'vue'

import { athletes as initialAthletes } from '@/data/athletes'
import type { Athlete } from '@/types/athlete'

export const useAthleteStore = defineStore('athletes', () => {
  const athletes = ref<Athlete[]>([...initialAthletes])

  function getAthleteById(id: string) {
    return athletes.value.find((athlete) => athlete.id === id)
  }

  function addAthlete(athlete: Athlete) {
    athletes.value.push(athlete)
  }

  return {
    athletes,
    getAthleteById,
    addAthlete,
  }
})

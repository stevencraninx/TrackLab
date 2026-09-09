import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import type { Competition } from '@/types/competition'

const STORAGE_KEY = 'tracklab-competitions'

export const useCompetitionStore = defineStore(
  'competitions',
  () => {
    const savedCompetitions =
      localStorage.getItem(STORAGE_KEY)

    const competitions = ref<Competition[]>(
      savedCompetitions
        ? JSON.parse(savedCompetitions)
        : []
    )

    function addCompetition(
      competition: Competition
    ) {
      competitions.value.push(competition)
    }

    function getCompetitionById(id: string) {
      return competitions.value.find(
        competition => competition.id === id
      )
    }

    function updateCompetition(
      updatedCompetition: Competition
    ) {
      const index =
        competitions.value.findIndex(
          competition =>
            competition.id ===
            updatedCompetition.id
        )

      if (index !== -1) {
        competitions.value[index] =
          updatedCompetition
      }
    }

    function removeCompetition(id: string) {
      competitions.value =
        competitions.value.filter(
          competition =>
            competition.id !== id
        )
    }

    watch(
      competitions,
      value => {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(value)
        )
      },
      { deep: true }
    )

    return {
      competitions,
      addCompetition,
      getCompetitionById,
      updateCompetition,
      removeCompetition,
    }
  }
)

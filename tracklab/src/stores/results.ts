import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import type { Result } from '@/types/result'
import { results as initialResults } from '@/data/results'

const STORAGE_KEY = 'tracklab-results'

export const useResultStore = defineStore(
  'results',
  () => {
    const savedResults =
      localStorage.getItem(STORAGE_KEY)

    const saved = savedResults
      ? JSON.parse(savedResults) as Result[]
      : []

    const combinedResults = [
        ...initialResults,
        ...saved.filter(
          savedResults =>
            !initialResults.some(
              initialResults =>
                initialResults.id === savedResults.id
            )
        )
      ]

      const results = ref<Result[]>(
        combinedResults
      )

    function addResult(result: Result) {
      results.value.push(result)
    }

    function removeResult(id: string) {
      results.value = results.value.filter(
        result => result.id !== id
      )
    }

    watch(
      results,
      value => {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(value)
        )
      },
      { deep: true }
    )

    return {
      results,
      addResult,
      removeResult,
    }
  }
)

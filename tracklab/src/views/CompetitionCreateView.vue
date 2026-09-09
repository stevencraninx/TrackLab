<template>
  <div>
    <h1>New Competition</h1>

    <CompetitionForm
      submit-label="Create Competition"
      @save="saveCompetition"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import CompetitionForm from '@/components/CompetitionForm.vue'
import { useCompetitionStore } from '@/stores/competitions'

const router = useRouter()
const competitionStore = useCompetitionStore()

function saveCompetition(competitionData: any) {
  competitionStore.addCompetition({
    id: crypto.randomUUID(),
    ...competitionData,
  })
  console.log(competitionData)
  router.push('/competitions')
}
</script>

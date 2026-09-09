<template>
  <div>
    <h1>Edit Competition</h1>

    <CompetitionForm
      v-if="competition"
      :competition="competition"
      submit-label="Update Competition"
      @save="UpdateCompetition"
    />

    <p v-else>
      Competition not found.
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import CompetitionForm from '@/components/CompetitionForm.vue'
import { useCompetitionStore } from '@/stores/competitions'

const route = useRoute()
const router = useRouter()

const competitionStore = useCompetitionStore()

const competition = computed (() =>
  competitionStore.getCompetitionById(route.params.id as string)
)

function UpdateCompetition(competitionData: any) {
  if (!competition.value) return

  competitionStore.updateCompetition({
    ...competition.value,
    ...competitionData,
  })
  console.log(competitionData)
  router.push('/competitions')
}
</script>

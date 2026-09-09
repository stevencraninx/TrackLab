<template>
  <div>
    <h1>New Athlete</h1>

    <AthleteForm
      submit-label="Create Athlete"
      @save="saveAthlete"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import AthleteForm from '@/components/AthleteForm.vue'
import { useAthleteStore } from '@/stores/athletes'

const router = useRouter()
const athleteStore = useAthleteStore()

function saveAthlete(athleteData: any) {
  athleteStore.addAthlete({
    id: crypto.randomUUID(),
    ...athleteData,
  })

  router.push('/athletes')
}
</script>

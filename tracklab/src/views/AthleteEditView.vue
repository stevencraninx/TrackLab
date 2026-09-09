<template>
  <div>
    <h1>Update Athlete</h1>

    <AthleteForm
      v-if="athlete"
      :athlete="athlete"
      submit-label="Update Athlete"
      @save="updateAthlete"
    />

    <p v-else>
      Athlete not found.
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import AthleteForm from '@/components/AthleteForm.vue'
import { useAthleteStore } from '@/stores/athletes'


const route = useRoute()
const router = useRouter()

const athleteStore = useAthleteStore()

const athlete = computed(() =>
  athleteStore.getAthleteById(route.params.id as string)
)

function updateAthlete(athleteData: any) {
  if (!athlete.value) return

  athleteStore.updateAthlete({
    ...athlete.value,
    ...athleteData,
  })

  router.push('/athletes')
}
</script>

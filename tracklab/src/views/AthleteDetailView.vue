<template>
  <div v-if="athlete">
    <button class="back-button" @click="router.back()">
      ← Back to athletes
    </button>

    <div class="athlete-header">
      <div>
        <h1>{{ athlete.name }}</h1>
        <p>{{ athlete.country }}</p>
      </div>
      <button @click="editAthlete">
        Edit athlete
      </button>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <span>Personal Best</span>
        <strong>{{ athlete.personalBest }}</strong>
      </div>

      <div class="stat-card">
        <span>Country</span>
        <strong>{{ athlete.country }}</strong>
      </div>
    </div>

    <div class="section">
      <h2>Performance</h2>

      <p>
        Performance data for {{ athlete.name }} will appear here.
      </p>
    </div>
  </div>

  <div v-else>
    <h1>Athlete not found</h1>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAthleteStore } from '@/stores/athletes'
const athleteStore = useAthleteStore()

const route = useRoute()
const router = useRouter()

const athlete = computed(() => {
  return athleteStore.getAthleteById(
    route.params.id as string
  )
})

function editAthlete() {
  router.push(`/athletes/${athlete.value?.id}/edit`)
}
</script>

<style scoped>
.back-button {
  margin-bottom: 24px;
  padding: 8px 12px;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.athlete-header {
  margin-bottom: 32px;
}

.athlete-header h1 {
  margin: 0;
}

.athlete-header p {
  margin-top: 8px;
  opacity: 0.6;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-card {
  padding: 20px;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
}

.stat-card span {
  display: block;
  font-size: 13px;
  opacity: 0.6;
  margin-bottom: 8px;
}

.stat-card strong {
  font-size: 24px;
}

.section {
  margin-top: 32px;
}

.section h2 {
  margin-bottom: 16px;
}
</style>

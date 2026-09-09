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
      <h3>Personal bests</h3>
      <table>
        <thead>
          <tr>
            <th>Distance</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> 500m </td>
            <td> {{pb500}}</td>
          </tr>
          <tr>
            <td> 1000m </td>
            <td>{{ pb1000 }}</td>
          </tr>
          <tr>
            <td> 1500m </td>
            <td>{{ pb1500 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="section">
      <h2>Competition Results</h2>

      <table v-if="athleteResults.length">
        <thead>
          <tr>
            <th>Competition</th>
            <th>Distance</th>
            <th>Round</th>
            <th>Position</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="result in athleteResults"
            :key="result.id"
          >
            <td> {{ getCompetitionName(result.competitionId) }} </td>
            <td>{{ result.distance }}m</td>
            <td>{{ result.round }}</td>

            <td>#{{ result.position }}</td>
            <td>{{ result.time }}</td>
          </tr>
        </tbody>
      </table>

      <p v-else>
        No results available.
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
import { useResultStore } from '@/stores/results'
import { useCompetitionStore } from '@/stores/competitions'

const athleteStore = useAthleteStore()
const resultStore = useResultStore()
const competitionStore = useCompetitionStore()

const route = useRoute()
const router = useRouter()

const athlete = computed(() => {
  return athleteStore.getAthleteById(
    route.params.id as string
  )
})



const athleteResults = computed(() => {
  if (!athlete.value) return []

  return resultStore.results.filter(
    result => result.athleteId === athlete.value!.id
  )

})

const pb500 = computed(() => {
  if (!athlete.value) return []
  const filterdRes = resultStore.results.filter(
    result => result.athleteId === athlete.value!.id && result.distance === 500
  )
  return Math.min(...filterdRes.map(r => Number(r.time)))
})

const pb1000 = computed(() => {
  if (!athlete.value) return []
  const filterdRes = resultStore.results.filter(
    result => result.athleteId === athlete.value!.id && result.distance === 1000
  )
  return Math.min(...filterdRes.map(r => Number(r.time)))
})

const pb1500 = computed(() => {
  if (!athlete.value) return []
  const filterdRes = resultStore.results.filter(
    result => result.athleteId === athlete.value!.id && result.distance === 1500
  )
  return Math.min(...filterdRes.map(r => Number(r.time)))
})

function editAthlete() {
  router.push(`/athletes/${athlete.value?.id}/edit`)
}
function getCompetitionName(competitionId: string) {
  return (
    competitionStore.getCompetitionById(
      competitionId
    )?.name ?? 'Unknown'
  )
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

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid #2a2a2a;
}

th {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.7;
}

.sortable {
  cursor: pointer;
  user-select: none;
}

.sortable:hover {
  opacity: 1;
}

.competition-name {
  font-weight: 600;
}

tbody tr:hover {
  background: rgba(255, 255, 255, 0.03);
}
</style>

<template>
  <div>
  <section class="competition-header">
    <div>
      <span class="competition-type">
        {{ competition?.type }}
      </span>

      <h1>{{ competition?.name }}</h1>

      <p>
        📍 {{ competition?.location }} ·
        📅 {{ competition?.date }}
      </p>
    </div>
    </section>
    <div class="stats-grid">
      <div class="stat-card">
        <span>Participants </span>
        <strong>{{ participantCount }}</strong>
      </div>

      <div class="stat-card">
        <span>Results </span>
        <strong>{{ resultCount }}</strong>
      </div>

      <div class="stat-card">
        <span>Fastest Time </span>
        <strong>
          {{ fastestTime ?? '-' }}
        </strong>
      </div>

      <div class="stat-card">
        <span>Average Time </span>
        <strong>
          {{ averageTime ?? '-' }}
        </strong>
      </div>
    </div>
    <section>
      <h2>Participants</h2>

      <div class="participants-grid">
        <div
          v-for="athlete in participants"
          :key="athlete.id"
          class="participant-card"
          @click="$router.push(`/athletes/${athlete.id}`)"
        >
          <h4>{{ athlete.name }}</h4>

          <p>{{ athlete.country }}</p>
        </div>
      </div>
    </section>
    <section class="card">
      <h2>Results</h2>

      <table>
        <thead>
          <tr>
            <th>Pos</th>
            <th>Athlete</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="result in sortedResults"
            :key="result.id"
          >
            <td>{{ result.position }}</td>

            <td>
              {{ athleteStore.getAthleteById(result.athleteId)?.name }}
            </td>

            <td>{{ result.time }}</td>
          </tr>
        </tbody>
      </table>
    </section>

  </div>
</template>

<script setup lang='ts'>

import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useCompetitionStore } from '@/stores/competitions'
import { useAthleteStore } from '@/stores/athletes'
import { useResultStore } from '@/stores/results'

const route = useRoute()

const competitionStore = useCompetitionStore()
const resultStore = useResultStore()


const competition = computed(() =>
  competitionStore.competitions.find(
    c => c.id === route.params.id
  )
)

const competitionResults = computed(() =>
  resultStore.results.filter(
    result => result.competitionId === route.params.id
  )
)

const athleteStore = useAthleteStore()

const participants = computed(() => {
  const athleteIds = [
    ...new Set(
      competitionResults.value.map(
        result => result.athleteId
      )
    ),
  ]

  return athleteStore.athletes.filter(
    athlete => athleteIds.includes(athlete.id)
  )
})

const sortedResults = computed(() => {
  return [...competitionResults.value]
    .sort((a, b) => a.position - b.position)
})

const participantCount = computed(() => {
  return new Set(
    competitionResults.value.map(r => r.athleteId)
  ).size
})
const resultCount = computed(() => {
  return competitionResults.value.length
})
const fastestTime = computed(() => {
  if (!competitionResults.value.length) return null

  return Math.min(
    ...competitionResults.value.map(r => r.time)
  )
})
const averageTime = computed(() => {
  if (!competitionResults.value.length) return null

  const total = competitionResults.value.reduce(
    (sum, r) => sum + r.time,
    0
  )

  return (
    total / competitionResults.value.length
  ).toFixed(3)
})

</script>

<style scoped>
.competition-header {
  padding: 32px;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.02);
}

.competition-header h1 {
  margin: 12px 0;
  font-size: 2rem;
}

.competition-type {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 999px;
  background: #2563eb;
  color: white;
  font-size: 12px;
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.stat-card {
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #2a2a2a;
  background: rgba(255, 255, 255, 0.02);

  transition: all 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-card span {
  font-size: 12px;
  text-transform: uppercase;
  opacity: 0.6;
}

.stat-card strong {
  display: block;
  margin-top: 12px;
  font-size: 2rem;
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

.participants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.participant-card {
  padding: 16px;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
}

.participant-card {
  cursor: pointer;
  transition: all .2s ease;
}

.participant-card:hover {
  transform: translateY(-2px);
  background: rgba(255,255,255,.03);
}

.card {
  margin-top: 32px;
  padding: 24px;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.02);
}
</style>

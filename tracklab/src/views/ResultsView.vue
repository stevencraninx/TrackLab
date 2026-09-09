<template>
  <div>
    <div class="page-header">
      <div>
        <h1>Results</h1>
      </div>
    </div>

    <div class="filters">
      <select v-model="selectedCompType">
        <option value="all">All competitions</option>
        <option value="WT">World tour</option>
        <option value="EK">European Champs</option>
        <option value="WK">World Champs</option>
      </select>
      <select v-model="selectedCompDistance">
        <option value="all">All distances</option>
        <option value="500">500m</option>
        <option value="1000">1000m</option>
        <option value="1500">1500m</option>
      </select>
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Search athlete..."
      />
    </div>



    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th >
              Position
            </th>
            <th>
              Athlete
            </th>
            <th>
              Country
            </th>
            <th>
              Distance
            </th>
            <th>
              Round
            </th>
            <th>
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="result in filteredResults"
            :key="result.id"
            class="result-row"
            @click="goToAthlete(result.athleteId)"
          >
            <td>{{ result.position }}</td>

            <td>
              {{ getAthleteName(result.athleteId) }}
            </td>

            <td>
              {{ getAthleteCountry(result.athleteId) }}
            </td>

            <td>
              {{ result.distance }}m
            </td>

            <td>
              {{ result.round }}
            </td>

            <td>
              {{ result.time }}
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="filteredResults.length === 0" class="empty-state">
        No results found.
      </p>
    </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useResultStore } from '@/stores/results'
import { useCompetitionStore } from '@/stores/competitions'
import { useAthleteStore } from '@/stores/athletes'

const router = useRouter()

const resultStore = useResultStore()
const competitionStore = useCompetitionStore()
const athleteStore = useAthleteStore()

const searchQuery = ref('')
const selectedCompType = ref('all')
const selectedCompDistance = ref('all')

const filteredResults = computed(() => {
  return resultStore.results.filter((result) => {
    const athlete = athleteStore.athletes.find(
      athlete => athlete.id === result.athleteId
    )

    const competition = competitionStore.getCompetitionById(
      result.competitionId
    )

    console.log('RESULT:', result)

    console.log('ATHLETE:', athlete)

    console.log('COMPETITION:', competition)

    if (!athlete || !competition) {
      return false
    }

    const matchesName = athlete.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())

    const matchesType =
      selectedCompType.value === 'all' ||
      competition.type === selectedCompType.value

    const matchesDistance =
      selectedCompDistance.value === 'all' ||
      result.distance.toString() ===
        selectedCompDistance.value

    return (
      matchesName &&
      matchesType &&
      matchesDistance
    )
  })
})

function getCompetition(competitionId: string) {
  return competitionStore.getCompetitionById(competitionId)
}

function getAthleteName(athleteId: string) {
  const athlete = athleteStore.athletes.find(
    athlete => athlete.id === athleteId
  )

  return athlete?.name ?? 'Unknown athlete'
}

function getAthleteCountry(athleteId: string) {
  const athlete = athleteStore.athletes.find(
    athlete => athlete.id === athleteId
  )

  return athlete?.country ?? '-'
}

function goToAthlete(id: string) {
  router.push(`/athletes/${id}`)
}
</script>


<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 24px;
}

.page-header h1 {
  margin: 0;
}

.page-header p {
  margin: 8px 0 0;
}

.stats {
  display: flex;
  gap: 32px;
}

.stats div {
  display: flex;
  flex-direction: column;
}

.stats strong {
  font-size: 24px;
}

.stats span {
  font-size: 13px;
  color: var(--color-text-muted);
}

.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.filters input,
.filters select {
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
}

.filters input {
  width: 240px;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

.sortable {
  cursor: pointer;
  user-select: none;
}

.sortable:hover {
  opacity: 1;
}

.athlete-name {
  font-weight: 600;
}

tbody tr:hover {
  background: rgba(255, 255, 255, 0.03);
}

.empty-state {
  margin-top: 32px;
}

.athlete-row {
  cursor: pointer;
}

.athlete-row:hover {
  background: var(--color-surface-hover);
}
</style>

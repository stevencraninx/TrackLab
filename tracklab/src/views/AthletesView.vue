<template>
  <div>
    <div class="page-header">
      <div>
        <h1>Athletes</h1>
        <p>Manage and analyse athlete performance.</p>
      </div>
      <div class="stats">
          <div>
            <strong>{{ athletesCount }}</strong>
            <span>Athletes</span>
          </div>
          <div>
            <strong>{{ countryCount }}</strong>
            <span>Countries</span>
          </div>
          <div>
            <strong>{{ fastestPB }}</strong>
            <span>Fastest PB</span>
          </div>
        </div>
      </div>
    </div>

    <div class="filters">
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Search athletes..."
      />
      <select v-model="selectedCountry">
        <option value="all">All countries</option>
        <option value="BEL">Belgium</option>
        <option value="NED">Netherlands</option>
        <option value="GER">Germany</option>
      </select>
    </div>


    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th @click="sortBy('name')" class="sortable">
              Name
              <span v-if="sortColumn === 'name'">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th @click="sortBy('country')" class="sortable">
              Country
              <span v-if="sortColumn === 'country'">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th @click="sortBy('personalBest')" class="sortable">
              Personal Best
              <span v-if="sortColumn === 'personalBest'">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th>
              actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="athlete in sortedAthletes"
            :key="athlete.id"
            @click="goToAthlete(athlete.id)"
            class="athlete-row">
            <td class="athlete-name">
              {{ athlete.name }}
            </td>
            <td>
              {{ athlete.country }}
            </td>
            <td>
              {{ athlete.personalBest }}
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="sortedAthletes.length === 0" class="empty-state">
        No athletes found.
      </p>
    </div>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router'

const router = useRouter()

function goToAthlete(id: number) {
  router.push(`/athletes/${id}`)
}

import { computed, ref } from 'vue'

import { useAthleteStore } from '@/stores/athletes'
const athleteStore = useAthleteStore()

const searchQuery = ref('')
const selectedCountry = ref('all')

const sortColumn = ref<'name' | 'country' | 'personalBest'>('name')
const sortDirection = ref<'asc' | 'desc'>('asc')

const athletesCount = computed(() => {
  return athleteStore.athletes.length
})

const countryCount = computed(() => {
  return new Set(
  athleteStore.athletes.map(a => a.country)
  ).size
})

const fastestPB = computed(() => {
  return Math.min(
    ...athleteStore.athletes.map(
      athlete => athlete.personalBest
    )
  )
})

const filteredAthletes = computed(() => {
  return athleteStore.athletes.filter((athlete) => {
    const matchesName = athlete.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())

    const matchesCountry =
      selectedCountry.value === 'all' ||
      athlete.country.toLowerCase() === selectedCountry.value.toLowerCase()

    return matchesName && matchesCountry
  })
})

const sortedAthletes = computed(() => {
  return [...filteredAthletes.value].sort((a, b) => {
    let comparison = 0

    if (sortColumn.value === 'name') {
      comparison = a.name.localeCompare(b.name)
    }

    if (sortColumn.value === 'country') {
      comparison = a.country.localeCompare(b.country)
    }

    if (sortColumn.value === 'personalBest') {
      comparison = a.personalBest - b.personalBest
    }

    return sortDirection.value === 'asc'
      ? comparison
      : -comparison
  })
})

function sortBy(column: 'name' | 'country' | 'personalBest') {
  if (sortColumn.value === column) {
    sortDirection.value =
      sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
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
  opacity: 0.6;
}

.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.filters input,
.filters select {
  padding: 10px 12px;
  border: 1px solid #2a2a2a;
  border-radius: 6px;
  background: transparent;
  color: inherit;
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
  background: rgba(255, 255, 255, 0.05);
}
</style>

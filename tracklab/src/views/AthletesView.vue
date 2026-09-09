<template>
  <div>
    <div class="page-header">
      <div>
        <h1>Athletes</h1>
        <p>Manage and analyse athlete performance.</p>
      </div>
      <div class="stats">
          <div class="card">
            <strong>{{ athletesCount }}</strong>
            <span>Athletes</span>
          </div>
          <div class="card">
            <strong>{{ countryCount }}</strong>
            <span>Countries</span>
          </div>
          <div class="card">
            <strong>{{ fastestPB }}</strong>
            <span>Fastest PB</span>
          </div>
        </div>
      </div>
      <div class="header-actions" style="margin-bottom:15px">
        <button @click="router.push('/athletes/new')" class="btn btn-primary">
          Add Athlete
        </button>
        <span style="margin:10px;"></span>
        <button @click="athleteStore.resetAthletes()" class="btn btn-primary">
          Reset Athletes
        </button>
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
            class="athlete-row">
            <td class="athlete-name" @click="goToAthlete(athlete.id)">
              {{ athlete.name }}
            </td>
            <td @click="goToAthlete(athlete.id)">
              {{ athlete.country }}
            </td>
            <td @click="goToAthlete(athlete.id)">
              {{ athlete.personalBest }}
            </td>
            <td>
              <button @click="athleteStore.removeAthlete(athlete.id)" class="icon-btn">
                Remove
              </button>
              <span style="margin:10px"></span>
              <button @click="editAthlete(athlete.id)" class="icon-btn">
                Edit athlete
              </button>
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

function goToAthlete(id: string) {
  router.push(`/athletes/${id}`)
}
function editAthlete(id: string) {
  router.push(`/athletes/${id}/edit`)
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

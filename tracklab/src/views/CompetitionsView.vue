<template>
  <div>
    <div class="page-header">
      <div>
        <h1>Competitions</h1>
        <p>Manage and view Competitions.</p>
      </div>
      <div class="stats">
          <div class="card">
            <strong>{{ competitionsCount }}</strong>
            <span>Competitions</span>
          </div>
          <div class="card">
            <strong>{{ locationsCount }}</strong>
            <span>Locations</span>
          </div>
        </div>
      </div>
      <div class="header-actions" style="margin-bottom:15px">
        <button @click="router.push('/competitions/new')" class="btn btn-primary">
          Add Competition
        </button>
      </div>
    </div>

    <div class="filters">
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Search Competitions..."
      />
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
            <th @click="sortBy('location')" class="sortable">
              Location
              <span v-if="sortColumn === 'location'">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th @click="sortBy('date')" class="sortable">
              Date
              <span v-if="sortColumn === 'date'">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th @click="sortBy('type')" class="sortable">
              Type
              <span v-if="sortColumn === 'type'">
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
            v-for="competition in sortedCompetitions"
            :key="competition.id"
            class="competition-row">
            <td class="competition-name" @click="goToCompetition(competition.id)">
              {{ competition.name }}
            </td>
            <td @click="goToCompetition(competition.id)">
              {{ competition.location }}
            </td>
            <td @click="goToCompetition(competition.id)">
              {{ competition.date }}
            </td>
            <td @click="goToCompetition(competition.id)">
              {{ competition.type }}
            </td>
            <td>
              <button @click="competitionStore.removeCompetition(competition.id)" class="icon-btn">
                Remove
              </button>
              <span style="margin:10px"></span>
              <button @click="editCompetition(competition.id)" class="icon-btn">
                Edit competition
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="sortedCompetitions.length === 0" class="empty-state">
        No competitions found.
      </p>
    </div>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router'

const router = useRouter()

function goToCompetition(id: string) {
  router.push(`/competitions/${id}`)
}
function editCompetition(id: string) {
  router.push(`/competitions/${id}/edit`)
}

import { computed, ref } from 'vue'

import { useCompetitionStore } from '@/stores/competitions'
const competitionStore = useCompetitionStore()

const searchQuery = ref('')
const selectedCountry = ref('all')

const sortColumn = ref<'name' | 'location' | 'date' | 'type'>('name')
const sortDirection = ref<'asc' | 'desc'>('asc')

const competitionsCount = computed(() => {
  return competitionStore.competitions.length
})

const locationsCount = computed(() => {
  return new Set(
  competitionStore.competitions.map(a => a.location)
  ).size
})


const filteredCompetitions = computed(() => {
  return competitionStore.competitions.filter((competition) => {
    const matchesName = competition.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())

    return matchesName
  })
})

const sortedCompetitions = computed(() => {
  return [...filteredCompetitions.value].sort((a, b) => {
    let comparison = 0

    if (sortColumn.value === 'name') {
      comparison = a.name.localeCompare(b.name)
    }

    if (sortColumn.value === 'location') {
      comparison = a.location.localeCompare(b.location)
    }

    if (sortColumn.value === 'date') {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
    }

    if (sortColumn.value === 'type') {
      comparison = a.type.localeCompare(b.type)
    }

    return sortDirection.value === 'asc'
      ? comparison
      : -comparison
  })
})

function sortBy(column: 'name' | 'location' | 'date' | 'type') {
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

.competition-name {
  font-weight: 600;
}

.empty-state {
  margin-top: 32px;
}

.competition-row {
  cursor: pointer;
}

.competition-row:hover {
  background: rgba(255, 255, 255, 0.05);
}
</style>

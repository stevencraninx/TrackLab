<template>
  <div>
    <div class="page-header">
      <div>
        <h1>Athletes</h1>
        <p>Manage and analyse athlete performance.</p>
      </div>

      <input
        v-model="searchQuery"
        type="search"
        placeholder="Search athletes..."
      />
      <select v-model="selectedCountry">
        <option value="all">All countries</option>
        <option value="BEL">Belgium</option>
        <option value="GER">Germany</option>
      </select>
    </div>

    <div class="athlete-grid">
      <AthleteCard
        v-for="athlete in filteredAthletes"
        :key="athlete.id"
        :athlete="athlete"
      />
    </div>

    <p v-if="filteredAthletes.length === 0" class="empty-state">
      No athletes found.
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import AthleteCard from '@/components/AthleteCard.vue'
import { athletes } from '@/data/athletes'

const searchQuery = ref('')
const selectedCountry = ref('all')

const filteredAthletes = computed(() => {
  return athletes.filter((athlete) => {
    const matchesName = athlete.name.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCountry = selectedCountry.value === 'all' || athlete.country.toLowerCase() === selectedCountry.value.toLowerCase()

    return matchesName && matchesCountry
  })
})
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 24px;
  margin-bottom: 32px;
}

.page-header h1 {
  margin: 0;
}

.page-header p {
  margin: 8px 0 0;
}

.page-header input {
  width: 240px;
  padding: 10px 12px;
  border: 1px solid #2a2a2a;
  border-radius: 6px;
  background: transparent;
  color: inherit;
}

.athlete-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.empty-state {
  margin-top: 32px;
}
</style>

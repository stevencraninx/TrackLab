<template>
  <div>
    <div class="page-header">
      <h1>Dashboard</h1>
      <p>TrackLab overview</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card" @click="$router.push(`/athletes`)">
        <span>Athletes</span>
        <strong>{{ athleteCount }}</strong>
      </div>

      <div class="stat-card" @click="$router.push(`/competitions`)">
        <span>Competitions</span>
        <strong>{{ competitionCount }}</strong>
      </div>

      <div class="stat-card" @click="$router.push(`/results`)">
        <span>Results</span>
        <strong>{{ resultCount }}</strong>
      </div>

      <div class="stat-card">
        <span>Countries</span>
        <strong>{{ countryCount }}</strong>
      </div>
    </div>
    <AthletesCountryChart class="barChart" />
    <section class="dashboard-section">
      <div class="section-header">
        <h2>Recent Competitions</h2>
      </div>

      <div class="competition-list">
        <div
          v-for="competition in recentCompetitions"
          :key="competition.id"
          class="competition-card"
          @click="$router.push(`/competitions/${competition.id}`)"
        >
          <div>
            <h3>{{ competition.name }}</h3>

            <p>
              {{ competition.location }}
            </p>
          </div>

          <div class="competition-meta">
            <span class="competition-type">
              {{ competition.type }}
            </span>

            <span>
              {{ competition.date }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="dashboard-section">
      <div class="section-header">
        <h2>Recent Results</h2>
      </div>

      <div class="results-list">
        <div
          v-for="result in recentResults"
          :key="result.id"
          class="result-card"
          @click="$router.push(`/competitions/${result.competitionId}`)"
        >
          <div>
            <h3>
              {{ athleteStore.getAthleteById(result.athleteId)?.name }}
            </h3>

            <p>
              {{ competitionStore.getCompetitionById(result.competitionId)?.name }}
            </p>
          </div>

          <div class="result-meta">
            <span class="position-badge">
              #{{ result.position }}
            </span>

            <span>
              {{ result.time }}s
            </span>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useAthleteStore } from '@/stores/athletes'
import { useCompetitionStore } from '@/stores/competitions'
import { useResultStore } from '@/stores/results'

import AthletesCountryChart from '@/components/AthletesCountryChart.vue'

const athleteStore = useAthleteStore()
const competitionStore = useCompetitionStore()
const resultStore = useResultStore()

const athleteCount = computed(
  () => athleteStore.athletes.length
)

const competitionCount = computed(
  () => competitionStore.competitions.length
)

const resultCount = computed(
  () => resultStore.results.length
)

const countryCount = computed(() => {
  return new Set(
    athleteStore.athletes.map(
      athlete => athlete.country
    )
  ).size
})

const recentCompetitions = computed(() => {
  return [...competitionStore.competitions]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
    .slice(0, 5)
})

const recentResults = computed(() => {
  return [...resultStore.results]
    .sort((a, b) => {
      const compA = competitionStore.getCompetitionById(a.competitionId)
      const compB = competitionStore.getCompetitionById(b.competitionId)

      return (
        new Date(compB?.date ?? 0).getTime() -
        new Date(compA?.date ?? 0).getTime()
      )
    })
    .slice(0, 5)
})

</script>


<style scoped>
.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  margin: 0;
}

.page-header p {
  margin-top: 8px;
  opacity: 0.6;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stat-card {
  padding: 24px;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.02);
  transition: 0.2s ease;

  cursor: pointer;
  transition: all 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-card span {
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.6;
}

.stat-card strong {
  display: block;
  margin-top: 8px;
  font-size: 2rem;
}

.dashboard-section {
  margin-top: 40px;
}

.section-header {
  margin-bottom: 16px;
}

.section-header h2 {
  margin: 0;
}

.competition-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.competition-card {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 18px 20px;

  border: 1px solid #2a2a2a;
  border-radius: 12px;

  background: rgba(255, 255, 255, 0.02);

  cursor: pointer;
  transition: all 0.2s ease;
}

.competition-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.04);
}

.competition-card h3 {
  margin: 0;
  font-size: 1rem;
}

.competition-card p {
  margin: 4px 0 0;
  opacity: 0.7;
}

.competition-meta {
  display: flex;
  align-items: center;
  gap: 16px;
}

.competition-type {
  padding: 4px 10px;
  border-radius: 999px;
  background: #2563eb;
  color: white;
  font-size: 12px;
  font-weight: 600;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.result-card {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 18px 20px;

  border: 1px solid #2a2a2a;
  border-radius: 12px;

  background: rgba(255, 255, 255, 0.02);

  cursor: pointer;
  transition: all 0.2s ease;
}

.result-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.04);
}

.result-card h3 {
  margin: 0;
  font-size: 1rem;
}

.result-card p {
  margin: 4px 0 0;
  opacity: 0.7;
}

.result-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.position-badge {
  min-width: 42px;
  text-align: center;

  padding: 4px 10px;

  border-radius: 999px;

  background: #f59e0b;
  color: #000;

  font-weight: 700;
}


</style>

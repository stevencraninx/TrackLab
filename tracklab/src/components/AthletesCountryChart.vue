<script setup lang="ts">
import { computed } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

import { Bar } from 'vue-chartjs'

import { useAthleteStore } from '@/stores/athletes'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
)

const athleteStore = useAthleteStore()

const chartData = computed(() => {
  const grouped: Record<string, number> = {}

  athleteStore.athletes.forEach((athlete) => {
    grouped[athlete.country] =
      (grouped[athlete.country] || 0) + 1
  })

  return {
    labels: Object.keys(grouped),
    datasets: [
      {
        label: 'Athletes',
        data: Object.values(grouped),
        backgroundColor: '#3b82f6',
        borderRadius: 6,
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
}
</script>

<template>
  <div class="chart-card">
    <h2>Athletes per Country</h2>

    <Bar
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<style scoped>
.chart-card {
  margin-top: 20px;
  height: 400px;
  width: 95%;
  padding: 24px;
  padding-bottom: 80px;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.02);
}

.chart-card h2 {
  margin-bottom: 20px;
}
</style>

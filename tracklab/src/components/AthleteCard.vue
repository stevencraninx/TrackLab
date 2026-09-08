<template>
  <div class="athlete-card">
    <h3>{{ athlete.name }}</h3>
    <p>{{ athlete.country }}</p>
    <p>Personal best: {{ athlete.personalBest }}s</p>
  </div>
</template>

<script setup lang="ts">
import type { Athlete } from '@/types/athlete'

defineProps<{
  athlete: Athlete
}>()
</script>

<style scoped>
.athlete-card {
  padding: 20px;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
}

.athlete-card h3 {
  margin: 0 0 8px;
}

.athlete-card p {
  margin: 4px 0;
}
</style>

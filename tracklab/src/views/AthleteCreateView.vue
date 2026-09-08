<template>
  <div class="page">
    <h1>New Athlete</h1>

    <form @submit.prevent="saveAthlete" class="form">
      <div class="field">
        <label>Name</label>
        <input v-model="name" required />
      </div>

      <div class="field">
        <label>Country</label>
        <select v-model="country" required>
          <option value="">Select country</option>
          <option value="BEL">Belgium</option>
          <option value="NED">Netherlands</option>
          <option value="GER">Germany</option>
        </select>
      </div>

      <div class="field">
        <label>Personal Best (seconds)</label>
        <input
          v-model.number="personalBest"
          type="float"
          min="0"
          required
        />
      </div>

      <div class="actions">
        <button type="submit">
          Save Athlete
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAthleteStore } from '@/stores/athletes'

const router = useRouter()
const athleteStore = useAthleteStore()

const name = ref('')
const country = ref('')
const personalBest = ref(0)

function saveAthlete() {
  athleteStore.addAthlete({
    id: Date.now(),
    name: name.value,
    country: country.value,
    personalBest: personalBest.value,
  })

  router.push('/athletes')
}
</script>

<style scoped>
.form {
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

input,
select {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #333;
  background: transparent;
  color: inherit;
}

.actions {
  margin-top: 12px;
}

button {
  padding: 12px 20px;
  cursor: pointer;
}
</style>

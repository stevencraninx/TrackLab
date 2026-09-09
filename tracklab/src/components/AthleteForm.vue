<template>
  <form @submit.prevent="submitForm" class="form">
    <div class="field">
      <label>Name</label>
      <input
        v-model="formData.name"
        type="text"
        required
      />
    </div>

    <div class="field">
      <label>Country</label>
      <select
        v-model="formData.country"
        required>
        <option value="">Select country</option>
        <option value="BEL">Belgium</option>
        <option value="NED">Netherlands</option>
        <option value="GER">Germany</option>
      </select>
    </div>

    <div class="field">
      <label>Personal Best</label>
      <input
        v-model.number="formData.personalBest"
        type="number"
        min="0"
        step="0.01"
        required
      />
    </div>

    <button type="submit" class="btn btn-primary">
      {{ submitLabel }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import type { Athlete } from '@/types/athlete'

const props = defineProps<{
  athlete?: Partial<Athlete>
  submitLabel?: string
}>()

const emit = defineEmits<{
  save: [athlete: Omit<Athlete, 'id'>]
}>()

const formData = reactive({
  name: props.athlete?.name ?? '',
  country: props.athlete?.country ?? '',
  personalBest: props.athlete?.personalBest ?? 0,
})

function submitForm() {
  emit('save', {
    name: formData.name,
    country: formData.country,
    personalBest: formData.personalBest,
  })
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

button {
  padding: 12px 16px;
  cursor: pointer;
}
</style>

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
      <label>Location</label>
      <input
        v-model="formData.location"
        type="text"
        required
      />
    </div>

    <div class="field">
      <label>Date</label>
      <input
        v-model="formData.date"
        type="date"
        required
      />
    </div>

    <div class="field">
      <label>Type</label>
      <select
        v-model="formData.type"
        required>
        <option value="">Select type</option>
        <option value="WK">World Champs</option>
        <option value="EK">European Champs</option>
        <option value="WT">World Tour</option>
      </select>
    </div>

    <button type="submit" class="btn btn-primary">
      {{ submitLabel }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import type { Competition } from '@/types/competition'

const props = defineProps<{
  competition?: Partial<Competition>
  submitLabel?: string
}>()

const emit = defineEmits<{
  save: [competition: Omit<Competition, 'id'>]
}>()

const formData = reactive({
  name: props.competition?.name ?? '',
  location: props.competition?.location ?? '',
  date: props.competition?.date ?? '',
  type: props.competition?.type ?? ''
})

function submitForm() {
  emit('save', {
    name: formData.name,
    location: formData.location,
    date: formData.date,
    type: formData.type,
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

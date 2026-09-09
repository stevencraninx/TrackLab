<template>
  <aside class="sidebar">
  <div class="logo">
    <div class="logo-icon">
      🏃
    </div>

    <div>
      <div class="logo-title">
        TrackLab
      </div>

      <div class="logo-subtitle">
        Performance Platform
      </div>
    </div>
    </div>

    <nav class="navigation">
      <RouterLink to="/dashboard">
        Dashboard
      </RouterLink>

      <RouterLink to="/athletes">
        Athletes
      </RouterLink>

      <RouterLink to="/competitions">
        Competitions
      </RouterLink>

      <RouterLink to="/results">
        Results
      </RouterLink>

      <RouterLink to="/trainings">
        Trainings
      </RouterLink>
    </nav>
    <div class="user-card">
      <div class="avatar">
        SP
      </div>

      <div>
        <strong>Steven Peeters </strong>
        <small> Coach</small>
      </div>
    </div>
  </aside>
</template>

<style scoped>

</style>

<template>
  <aside class="sidebar">
    <div class="logo">
      TrackLab
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

      <RouterLink to="/trainings">
        Trainings
      </RouterLink>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 220px;
  min-height: 100vh;
  padding: 24px 16px;
  border-right: 1px solid #2a2a2a;
}

.logo {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 40px;
}

.navigation {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.navigation a {
  padding: 10px 12px;
  border-radius: 6px;
  text-decoration: none;
}

.navigation a.router-link-active {
  font-weight: 600;
}
</style>

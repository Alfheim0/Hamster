<template>
  <div id="app">
    <nav class="navigation">
      <router-link to="/" class="nav-link">Главная</router-link>
      <router-link to="/races" class="nav-link">Гонки хомяков</router-link>
    </nav>
    
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
#app {
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
  min-height: 100vh;
}

.navigation {
  background-color: #333;
  padding: 10px;
  display: flex;
  gap: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
}

.nav-link:hover {
  background-color: #555;
}

.content {
  width: 100%;
}
</style>
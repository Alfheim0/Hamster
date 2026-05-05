<script setup>
import useUsers from './composables/useUser'
import TopBar from './components/TopBar.vue'
import SideBar from './components/SideBar.vue'

const users = useUsers()
</script>

<template>
  <div class="game-layout" v-if="users.currentUser.value">
    <TopBar />
    <div class="game-body">
      <SideBar />
      <main class="game-content">
        <router-view />
      </main>
    </div>
  </div>
  <router-view v-else />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #2D1B0E;
  color: #FFE4B5;
  font-family: 'Press Start 2P', monospace;
  min-height: 100vh;
}

img {
  image-rendering: pixelated;
}

.game-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.game-body {
  display: flex;
  flex: 1;
}

.game-content {
  flex: 1;
  background: #85A56F;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
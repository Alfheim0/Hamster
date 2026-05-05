<script setup>
import { computed } from 'vue'
import useUsers from '../composables/useUser'
import coinIcon from '../assets/img/logo/hamster-coin.png'
import diamondIcon from '../assets/img/logo/diamond.png'

const users = useUsers()

const username = computed(() => {
  return users.currentUser.value?.login
})

const coins = computed(() => {
  return users.currentUser.value?.coins
})

const diamonds = computed(() => {
  return users.currentUser.value?.diamonds
})
</script>


<template>
  <header class="top-bar">
    <span class="logo">PDLD: Hamsters Races</span>
    <div class="user-info">
      <span class="username">{{ username }}</span>
      <div class="currency">
        <div class="currency-item">
          <img :src="coinIcon" alt="" class="currency-icon" />
          <span>{{ coins }}</span>
        </div>
        <div class="currency-item">
          <img :src="diamondIcon" alt="" class="currency-icon" />
          <span>{{ diamonds }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
  padding: 0 20px;
  background: #5C4A3A;
  border-bottom: 4px solid #3D2B1A;
  flex-shrink: 0;
}

.logo {
  font-size: 14px;
  color: #FFD700;
  text-shadow: 2px 2px 0 #8B6914;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 18px;
}

.username {
  font-size: 10px;
  color: #FFE4B5;
  text-shadow: 1px 1px 0 #2D1B0E;
}

.currency {
  display: flex;
  align-items: center;
  gap: 16px;
}

.currency-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #FFE4B5;
}

.currency-icon {
  width: 30px;
  height: 30px;
  image-rendering: pixelated;
  object-fit: contain;
}
</style>
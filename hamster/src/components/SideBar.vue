<script setup>
import { useRouter } from 'vue-router'
import useUsers from '../composables/useUser'
import iconRace from '../assets/img/logo/logo_race.png'
import iconInventory from '../assets/img/logo/logo_sochi.png'
import iconStore from '../assets/img/logo/logo_store.png'
import iconGacha from '../assets/img/logo/logo_race.png'
import iconFarm from '../assets/img/logo/logo_farm.png'
import iconProfile from '../assets/img/logo/logo_profile.png'

const router = useRouter()
const users = useUsers()

function handleLogout() {
  users.logout()
  router.push({ name: 'auth' })
}
</script>

<template>
  <nav class="side-bar">
    <router-link :to="{ name: 'race' }" class="side-link">
      <img :src="iconRace" alt="" class="side-icon" />
      Гонки
    </router-link>
    <router-link :to="{ name: 'inventory' }" class="side-link">
      <img :src="iconInventory" alt="" class="side-icon" />
      Инвентарь
    </router-link>
    <router-link :to="{ name: 'shop' }" class="side-link">
      <img :src="iconStore" alt="" class="side-icon" />
      Магазин
    </router-link>
    <router-link :to="{ name: 'gacha' }" class="side-link">
      <img :src="iconGacha" alt="" class="side-icon" />
      Гача
    </router-link>
    <router-link :to="{ name: 'farm' }" class="side-link">
      <img :src="iconFarm" alt="" class="side-icon" />
      Фармилка
    </router-link>
    <router-link :to="{ name: 'profile' }" class="side-link">
      <img :src="iconProfile" alt="" class="side-icon" />
      Профиль
    </router-link>
    <button class="logout-btn" @click="handleLogout">Выйти</button>
  </nav>
</template>

<style scoped>
.side-bar {
  display: flex;
  flex-direction: column;
  width: 180px;
  background: #4A3B2F;
  border-right: 4px solid #3D2B1A;
  padding: 8px 0;
  flex-shrink: 0;
}

.side-link {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  color: #C4B5A5;
  text-decoration: none;
  padding: 12px 14px;
  border-bottom: 3px solid #3D2B1A;
  transition: background 0.1s, color 0.1s;
  letter-spacing: 0.5px;
}

.side-icon {
  width: 40px;
  height: 40px;
  image-rendering: pixelated;
  object-fit: contain;
  flex-shrink: 0;
}

.side-link:hover {
  background: #5C4A3A;
  color: #FFE4B5;
}

.side-link.router-link-exact-active,
.side-link.router-link-active {
  background: #F49032;
  color: #FFF;
  border-right: 4px solid #C67A28;
}

.logout-btn {
  font-family: 'Press Start 2P', monospace;
  font-size: 11px;
  margin: auto 12px 12px;
  padding: 10px;
  background: #3D2B1A;
  color: #A09080;
  border: 2px solid #2D1B0E;
  cursor: pointer;
  transition: background 0.1s, color 0.1s;
}

.logout-btn:hover {
  background: #5C4A3A;
  color: #FF6B6B;
}
</style>
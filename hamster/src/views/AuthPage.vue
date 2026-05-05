<template>
  <div class="auth-screen">
    <!-- Хомяки на фоне -->
    <div class="auth-bg">
      <img :src="face1" alt="" class="hamster-face face-1" />
      <img :src="face2" alt="" class="hamster-face face-2" />
      <img :src="face3" alt="" class="hamster-face face-3" />
      <img :src="face4" alt="" class="hamster-face face-4" />
      <img :src="face5" alt="" class="hamster-face face-5" />
    </div>

    <!-- Карточка авторизации -->
    <div class="auth-card">
      <div class="auth-logo">PDLD</div>

      <div class="auth-tabs">
        <button :class="{ active: isLogin }" @click="switchToLogin">Вход</button>
        <button :class="{ active: !isLogin }" @click="switchToRegister">Регистрация</button>
      </div>

      <!-- Форма входа -->
      <form v-if="isLogin" @submit.prevent="handleLogin" class="auth-form">
        <div class="field-group">
          <input 
            v-model="loginForm.login" 
            type="text" 
            placeholder="Логин" 
            maxlength="16"
            :class="{ 'input-error': loginErrors.login }"
          />
          <p v-if="loginErrors.login" class="field-error">{{ loginErrors.login }}</p>
        </div>

        <div class="field-group">
          <input 
            v-model="loginForm.password" 
            type="password" 
            placeholder="Пароль" 
            maxlength="32"
            :class="{ 'input-error': loginErrors.password }"
          />
          <p v-if="loginErrors.password" class="field-error">{{ loginErrors.password }}</p>
        </div>

        <p v-if="loginErrors.general" class="auth-error">{{ loginErrors.general }}</p>
        <button type="submit" class="auth-submit">Войти</button>
      </form>

      <!-- Форма регистрации -->
      <form v-if="!isLogin" @submit.prevent="handleRegister" class="auth-form">
        <div class="field-group">
          <input 
            v-model="registerForm.login" 
            type="text" 
            placeholder="Логин" 
            maxlength="16"
            :class="{ 'input-error': registerErrors.login }"
          />
          <p v-if="registerErrors.login" class="field-error">{{ registerErrors.login }}</p>
        </div>

        <div class="field-group">
          <input 
            v-model="registerForm.password" 
            type="password" 
            placeholder="Пароль" 
            maxlength="32"
            :class="{ 'input-error': registerErrors.password }"
          />
          <p v-if="registerErrors.password" class="field-error">{{ registerErrors.password }}</p>
        </div>

        <button type="submit" class="auth-submit">Зарегистрироваться</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import useUsers from '../composables/useUser'
import face1 from '../assets/img/travka/face1.png'
import face2 from '../assets/img/travka/face2.png'
import face3 from '../assets/img/travka/face3.png'
import face4 from '../assets/img/travka/face4.png'
import face5 from '../assets/img/travka/face5.png'

const router = useRouter()
const users = useUsers()

const isLogin = ref(true)

const loginForm = reactive({ login: '', password: '' })
const registerForm = reactive({ login: '', password: '' })

const loginErrors = reactive({ login: '', password: '', general: '' })
const registerErrors = reactive({ login: '', password: '' })

function clearLoginErrors() {
  loginErrors.login = ''
  loginErrors.password = ''
  loginErrors.general = ''
}

function clearRegisterErrors() {
  registerErrors.login = ''
  registerErrors.password = ''
}

function switchToLogin() {
  isLogin.value = true
  clearLoginErrors()
  clearRegisterErrors()
}

function switchToRegister() {
  isLogin.value = false
  clearLoginErrors()
  clearRegisterErrors()
}

function handleLogin() {
  clearLoginErrors()
  let valid = true

  if (!loginForm.login.trim()) {
    loginErrors.login = 'Введите логин'
    valid = false
  }

  if (!loginForm.password) {
    loginErrors.password = 'Введите пароль'
    valid = false
  }

  if (!valid) return

  const success = users.login(loginForm.login, loginForm.password)
  if (success) {
    loginForm.login = ''
    loginForm.password = ''
    router.push({ name: 'race' })
  } else {
    loginErrors.general = 'Неверный логин или пароль'
  }
}

function handleRegister() {
  clearRegisterErrors()
  let valid = true

  if (!registerForm.login.trim()) {
    registerErrors.login = 'Введите логин'
    valid = false
  } else if (!users.isLoginUnique(registerForm.login)) {
    registerErrors.login = 'Логин уже занят'
    valid = false
  }

  if (!registerForm.password) {
    registerErrors.password = 'Введите пароль'
    valid = false
  } else if (registerForm.password.length < 4) {
    registerErrors.password = 'Минимум 4 символа'
    valid = false
  }

  if (!valid) return

  users.addUser(registerForm.login, registerForm.password)
  registerForm.login = ''
  registerForm.password = ''
  router.push({ name: 'race' })
}
</script>

<style scoped>
.auth-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #8FC673;
  font-family: 'Press Start 2P', monospace;
  position: relative;
  overflow: hidden;
}

/* ==================== ХОМЯКИ НА ФОНЕ ==================== */
.auth-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 55%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.hamster-face {
  position: absolute;
  image-rendering: pixelated;
  object-fit: contain;
  opacity: 0.9;
}

.face-1 {
  width: 110px;
  height: 110px;
  top: 8%;
  left: 12%;
  transform: rotate(-12deg);
}

.face-2 {
  width: 150px;
  height: 150px;
  top: 22%;
  left: 58%;
  transform: rotate(30deg);
}

.face-3 {
  width: 130px;
  height: 130px;
  top: 48%;
  left: 18%;
  transform: rotate(-5deg);
}

.face-4 {
  width: 85px;
  height: 85px;
  top: 62%;
  left: 52%;
  transform: rotate(4deg);
}

.face-5 {
  width: 100px;
  height: 100px;
  top: 78%;
  left: 22%;
  transform: rotate(-8deg);
}

/* ==================== КАРТОЧКА АВТОРИЗАЦИИ ==================== */
.auth-card {
  width: 400px;
  background: #4A3B2F;
  border: 6px solid #3D2B1A;
  box-shadow: 8px 8px 0 #1A0F07;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;
  z-index: 1;
  margin-left: 25%;
}

.auth-logo {
  font-size: 28px;
  color: #FFD700;
  text-shadow: 3px 3px 0 #8B6914;
  letter-spacing: 4px;
}

.auth-tabs {
  display: flex;
  width: 100%;
  border: 3px solid #3D2B1A;
}

.auth-tabs button {
  flex: 1;
  font-family: 'Press Start 2P', monospace;
  font-size: 9px;
  padding: 10px;
  background: #5C4A3A;
  color: #A09080;
  border: none;
  cursor: pointer;
}

.auth-tabs button.active {
  background: #FFA44E;
  color: #FFF;
  box-shadow: inset 0 -3px 0 #CC7A30;
}

.auth-tabs button:hover:not(.active) {
  background: #6B5A4A;
  color: #FFE4B5;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.auth-form input {
  font-family: 'Press Start 2P', monospace;
  font-size: 9px;
  padding: 12px;
  background: #4F6242;
  color: #FFE4B5;
  border: 4px solid #3D2B1A;
  outline: none;
}

.auth-form input::placeholder {
  color: #A0B890;
}

.auth-form input:focus {
  border-color: #FFA44E;
}

.auth-form input.input-error {
  border-color: #FF6B6B;
}

.field-error {
  font-size: 7px;
  color: #FF6B6B;
  text-shadow: 1px 1px 0 #2D1B0E;
  padding-left: 2px;
}

.auth-error {
  font-size: 8px;
  color: #FF6B6B;
  text-shadow: 1px 1px 0 #2D1B0E;
  text-align: center;
}

.auth-submit {
  font-family: 'Press Start 2P', monospace;
  font-size: 12px;
  padding: 14px;
  background: #FFA44E;
  color: #FFF;
  border: 4px solid #CC7A30;
  box-shadow: 4px 4px 0 #996022;
  cursor: pointer;
  margin-top: 4px;
}

.auth-submit:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #996022;
}

.auth-submit:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 #996022;
}
</style>
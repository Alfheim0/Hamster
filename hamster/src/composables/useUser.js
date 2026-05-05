import { ref } from 'vue'

const userList = ref(JSON.parse(localStorage.getItem('pdld_users') || '[]'))
const currentUser = ref(JSON.parse(localStorage.getItem('pdld_currentUser') || 'null'))

function saveUsers() {
  localStorage.setItem('pdld_users', JSON.stringify(userList.value))
}

function saveCurrentUser(user) {
  currentUser.value = user
  localStorage.setItem('pdld_currentUser', JSON.stringify(user))
}

function addUser(login, password) {
  const newUser = {
    id: Date.now(),
    login,
    password,
    coins: 100,        // стартовые монеты
    diamonds: 5,        // стартовые алмазы
    createdAt: new Date().toISOString()
  }
  userList.value.push(newUser)
  saveUsers()
  saveCurrentUser(newUser)
  return newUser
}

function login(login, password) {
  const found = userList.value.find(u => u.login === login && u.password === password)
  if (found) {
    saveCurrentUser(found)
    return true
  }
  return false
}

function logout() {
  currentUser.value = null
  localStorage.removeItem('pdld_currentUser')
}

function isLoginUnique(login) {
  return !userList.value.some(u => u.login === login)
}

function getCurrentUser() {
  return currentUser.value
}

function addCoins(amount) {
  if (currentUser.value) {
    currentUser.value.coins += amount
    updateUserInList(currentUser.value)
    saveCurrentUser(currentUser.value)
  }
}

function spendCoins(amount) {
  if (currentUser.value && currentUser.value.coins >= amount) {
    currentUser.value.coins -= amount
    updateUserInList(currentUser.value)
    saveCurrentUser(currentUser.value)
    return true
  }
  return false
}

function addDiamonds(amount) {
  if (currentUser.value) {
    currentUser.value.diamonds += amount
    updateUserInList(currentUser.value)
    saveCurrentUser(currentUser.value)
  }
}

function spendDiamonds(amount) {
  if (currentUser.value && currentUser.value.diamonds >= amount) {
    currentUser.value.diamonds -= amount
    updateUserInList(currentUser.value)
    saveCurrentUser(currentUser.value)
    return true
  }
  return false
}

function updateUserInList(updatedUser) {
  const index = userList.value.findIndex(u => u.id === updatedUser.id)
  if (index !== -1) {
    userList.value[index] = { ...updatedUser }
    saveUsers()
  }
}

export default function useUsers() {
  return {
    userList,
    currentUser,
    addUser,
    login,
    logout,
    isLoginUnique,
    getCurrentUser,
    addCoins,
    spendCoins,
    addDiamonds,
    spendDiamonds
  }
}
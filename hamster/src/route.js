import { createRouter, createWebHistory } from 'vue-router'
import useUsers from './composables/useUser'
import AuthPage from './views/AuthPage.vue'
import Race from './views/Race.vue'
import Inventory from './views/Inventory.vue'
import Shop from './views/Shop.vue'
import Gacha from './views/Gacha.vue'
import Farm from './views/Farm.vue'
import Profile from './views/Profile.vue'

const routes = [
  {
    path: '/',
    redirect: { name: 'auth' }
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthPage
  },
  {
    path: '/race',
    name: 'race',
    component: Race,
    meta: { requiresAuth: true }
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: Inventory,
    meta: { requiresAuth: true }
  },
  {
    path: '/shop',
    name: 'shop',
    component: Shop,
    meta: { requiresAuth: true }
  },
  {
    path: '/gacha',
    name: 'gacha',
    component: Gacha,
    meta: { requiresAuth: true }
  },
  {
    path: '/farm',
    name: 'farm',
    component: Farm,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'auth' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const users = useUsers()
  const currentUser = users.getCurrentUser()

  if (to.meta.requiresAuth && !currentUser) {
    next({ name: 'auth' })
  } else if (to.name === 'auth' && currentUser) {
    next({ name: 'race' })
  } else {
    next()
  }
})

export default router
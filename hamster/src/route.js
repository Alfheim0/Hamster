import { createRouter, createWebHistory } from "vue-router";
import HamsterRaces from "./components/hamster-races.vue";

const routes = [
    { path: '/', component: HamsterRaces, name: 'Home' },
    { path: '/races', component: HamsterRaces, name: 'HamsterRaces' }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
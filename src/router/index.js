import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '../components/MainMenu.vue'
import CreateRoom from '../components/CreateRoom.vue'
import RoomPage from '../components/RoomPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: MainMenu },
    { path: '/create-room', component: CreateRoom },
    { path: '/room/:roomName', component: RoomPage, props: true }
  ]
})

export default router

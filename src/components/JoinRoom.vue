<template>
  <div class="join-room">
    <header>
      <h2 class="logo header-logo">Trivia Duel</h2>
    </header>
    <main>
      <h2>Join a Room</h2>
      <input v-model="roomCode" placeholder="Enter room code" />
      <button @click="joinRoom">Join Room</button>
    </main>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  export default {
    name: 'JoinRoom',
    setup() {
      const roomCode = ref('')
      const router = useRouter()

      const joinRoom = () => {
        // API Placeholder :
        if (roomCode.value) {
          router.push(`/room/${roomCode.value}`)
        }
      }

      return {
        roomCode,
        joinRoom
      }
    }
  }
</script>

<style scoped>
  .join-room {
    text-align: center;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
  }

  main {
    flex: 0.8;
    place-content: center;
  }

  header {
    display: flex;
    justify-content: center;
    padding: 1rem;
    background-color: var(--color-background);
  }

  .header-logo {
    font-size: 2rem;
  }

  input {
    margin: 10px;
  }

  button {
    margin: 10px;
  }
</style>

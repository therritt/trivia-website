<template>
  <div class="main-menu">
    <header>
      <h1 class="logo">Trivia Duel</h1>
    </header>
    
    <!-- Username Input -->
    <div v-if="!username" class="username-container">
      <input 
        type="text" 
        v-model="localUsername" 
        placeholder="Enter your username"
      />
      <button :disabled="!isUsernameValid" @click="setUsername">Submit</button>
    </div>
    
    <!-- Buttons -->
    <div v-if="username" class="button-container">
      <button class="create-button" @click="goToCreateRoom">Create Room</button>
      <button class="join-button" @click="joinRoom">Join Room</button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'MainMenu',
  setup() {
    const router = useRouter()
    const username = ref('')
    const localUsername = ref('')

    // Validate the username (for example, ensure it is not empty)
    const isUsernameValid = computed(() => localUsername.value.trim().length > 0)

    // Set the username and update the state
    const setUsername = () => {
      if (isUsernameValid.value) {
        username.value = localUsername.value.trim()
        localUsername.value = ''
      }
    }

    // Navigate to create room page
    const goToCreateRoom = () => {
      router.push({path: '/create-room', query: {username: username.value}})
    }

    // Navigate to join room page
    const joinRoom = () => {
      router.push({path: '/join-room', query: {username: username.value}})
    }

    return {
      username,
      localUsername,
      isUsernameValid,
      setUsername,
      goToCreateRoom,
      joinRoom
    }
  }
}
</script>

<style scoped>
.main-menu {
  padding: 0 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
  height: 90vh;
  width: 100%;
}

.username-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.username-container input {
  padding: 0.5rem;
  font-size: 1.2rem;
}

.username-container button {
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  background-color: var(--trivia-blue);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button-container {
  display: flex;
  gap: 0px 1rem;
  justify-content: space-around;
  align-self: center;
  height: 4rem;
  width: 80%;
}

.create-button {
  background-color: var(--trivia-red);
}

.join-button {
  background-color: var(--trivia-cyan);
}

button {
  margin: auto;
  width: 40%;
  height: 100%;
  font-size: 2rem;
}

@media (max-width: 1024px) {
  .button-container {
    width: 100%;
  }

  button {
    width: 50%;
    font-size: 1.5rem;
  }
}
</style>

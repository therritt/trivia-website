<template>
  <div class="create-room">
    <h2>Create a Room</h2>
    <input v-model="roomCode" placeholder="Enter room code" />
    <button @click="createRoom">Create Room</button>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  export default {
    name: 'CreateRoom',
    setup() {
      const roomCode = ref('')
      const router = useRouter()

      const createRoom = () => {
        // API Placeholder
        if (roomCode.value) {
          router.push(`/room/${roomCode.value}`)
        }
      }

      return {
        roomCode,
        createRoom
      }
    }
  }
</script>

<style scoped>
  .create-room {
    text-align: center;
    width: 100%;
  }

  input {
    margin: 10px;
  }

  button {
    margin: 10px;
  }
</style>

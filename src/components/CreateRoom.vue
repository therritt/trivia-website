<template>
    <div class="create-room">
      <h2>Create a Room</h2>
      <input v-model="roomName" placeholder="Enter room name" />
      <button @click="createRoom">Create Room</button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'CreateRoom',
    setup() {
      const roomName = ref('');
      const router = useRouter();
  
      const createRoom = () => {
        // Implement the logic to create a room, possibly via an API
        // For now, let's just navigate to a placeholder page
        if (roomName.value) {
          router.push(`/room/${roomName.value}`);
        }
      };
  
      return {
        roomName,
        createRoom,
      };
    },
  };
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
  
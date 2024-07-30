<template>
    <div class="main-menu">
      <h1>Trivia Duel</h1>
      <button @click="goToCreateRoom">Create Room</button>
      <button @click="joinRoom">Join Room</button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'MainMenu',
    setup() {
      const router = useRouter();
  
      const goToCreateRoom = () => {
        router.push('/create-room');
      };
  
      const joinRoom = () => {
        // Navigate to a join room page or prompt for room code
        router.push('/join-room');
      };
  
      return {
        goToCreateRoom,
        joinRoom,
      };
    },
  };
  </script>
  
  <style scoped>
  .main-menu {
    text-align: center;
  }
  h1 {
    color: rgb(220, 18, 75);
    font-family: Brush Script MT, Brush Script Std, cursive;
  }
  button {
    margin: 10px;
  }

  @media (min-width: 1024px) {
    h1 {
        -webkit-text-stroke: 1px rgb(185, 255, 255);
        font-size: 10vw;
    }
  }
  </style>
  
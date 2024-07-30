<template>
    <div class="main-menu">
        <header>
            <h1>Trivia Duel</h1>
        </header>
        <div class="button-container">
          <button class="create-button" @click="goToCreateRoom">Create Room</button>
          <button class="join-button" @click="joinRoom">Join Room</button>
        </div>
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
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;
    height: 90vh;
    width: 100%;
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

  h1 {
    color: var(--trivia-red);
    -webkit-text-stroke: 1px var(--trivia-cyan);
    
    font-family: Brush Script MT, Brush Script Std, cursive;
    font-size: 15vw;
  }

  button {
    margin: auto;
    width: 40%;
    height: 100%;
    font-size: 2rem;
  }

  @media (max-width: 1024px) {
    h1 {
        font-size: 20vw;
    }

    .button-container {
        width: 100%;
    }

    button {
        width: 50%;
        font-size: 1.5rem;
    }
  }
</style>
  
<template>
  <div class="room-setup">
    <div class="button-container">
      <button @click="startGame">Start Game</button>
    </div>
    <div class="list-container">
      <PlayerList :players="players" />
    </div>
  </div>
</template>

<script>
import PlayerList from './PlayerList.vue';

  export default {
    name: 'RoomSetup',
    components: {
      PlayerList
    },
    props: {
      onStart: {
        type: Function,
        required: true
      },
      players: {
        type: Array,
        default: () => [],
      }
    },
    setup(props) {
      const startGame = () => {
        props.onStart()
      }

      return {
        startGame
      }
    }
  }
</script>

<style scoped>
  .room-setup {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .button-container {
    flex: 1;
    display: flex;
    place-content: center;
  }

  .list-container {
    flex: 2;
  }

  button {
    margin: auto;
    width: 100%;
    height: 40%;
    font-size: 2rem;
    background-color: var(--trivia-red);
  }
</style>

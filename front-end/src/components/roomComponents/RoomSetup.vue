<template>
  <div class="room-setup">
    <button @click="startGame">Start Game</button>
    <PlayerList :players="players" />
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
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
  }
</style>

<template>
  <div class="room-setup">
    <button @click="startGame">Start Game</button>
  </div>
</template>

<script>
  export default {
    name: 'RoomSetup',
    props: {
      onStart: {
        type: Function,
        required: true
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

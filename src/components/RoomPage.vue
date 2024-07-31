<template>
  <div class="room-page">
    <header>
      <div class="room-code-container">
        <h2>Room Code:</h2>
        <div class="room-code">
          <h2>{{ roomCode }}</h2>
        </div>
      </div>
      <h2 class="logo header-logo">Trivia Duel</h2>
    </header>
    <!-- Implement game UI and logic here -->
  </div>
</template>

<script>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  export default {
    name: 'RoomPage',
    setup() {
      const route = useRoute()
      const roomCode = computed(() => route.params.roomCode)

      return {
        roomCode
      }
    }
  }
</script>

<style scoped>
  .room-page {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
  }

  header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background-color: var(--color-background);
  }

  .header-logo {
    font-size: 2rem;
  }

  .room-code-container {
    display: flex;
  }

  .room-code {
    width: fit-content;
    margin: 0 0.5rem;

    border-radius: 5px;
    border: 2px solid var(--color-border);
    background-color: var(--vt-c-white-mute);

    color: var(--vt-c-text-light-1);
  }
</style>

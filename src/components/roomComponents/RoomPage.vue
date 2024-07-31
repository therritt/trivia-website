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

    <!-- Conditionally render components based on game state -->
    <RoomSetup v-if="!isGameStarted" :onStart="startGame" />
    <TriviaQuestion v-else :question="currentQuestion" :onAnswer="submitAnswer" />
  </div>
</template>

<script>
  import { ref, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import RoomSetup from './RoomSetup.vue'
  import TriviaQuestion from './TriviaQuestion.vue'

  export default {
    name: 'RoomPage',
    components: {
      RoomSetup,
      TriviaQuestion
    },
    setup() {
      const route = useRoute()
      const roomCode = computed(() => route.params.roomCode)

      const isGameStarted = ref(false)
      const defaultQuestion = { text: '', answers: [] }
      const currentQuestion = ref(defaultQuestion)

      const startGame = () => {
        currentQuestion.value.text = 'What framework is this frontend built with?'
        currentQuestion.value.answers = ['Vue.js', 'Bootstrap', 'React', 'Angular']
        isGameStarted.value = true
      }

      const checkAnswer = (answer) => {
        return answer === 'Vue.js'
      }

      const submitAnswer = (answer) => {
        if (checkAnswer(answer)) {
          currentQuestion.value = defaultQuestion
          isGameStarted.value = false
        }
      }

      return {
        roomCode,
        isGameStarted,
        currentQuestion,
        startGame,
        submitAnswer
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

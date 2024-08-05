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
    <RoomSetup v-if="!isGameStarted && !showLeaderboard" :onStart="startGame" :players="playerList"/>
    <TriviaQuestion v-if="isGameStarted && !showLeaderboard" :question="currentQuestion" :onAnswer="submitAnswer" />
    <Leaderboard v-if="showLeaderboard" :players="playerList" />
  </div>
</template>

<script>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import RoomSetup from './RoomSetup.vue'
  import TriviaQuestion from './TriviaQuestion.vue'
  import Leaderboard from './Leaderboard.vue';

  export default {
    name: 'RoomPage',
    components: {
      RoomSetup,
      TriviaQuestion,
      Leaderboard
    },
    setup() {
      const route = useRoute()
      const router = useRouter()
      const roomCode = computed(() => route.params.roomCode || '')

      const isGameStarted = ref(false)
      const showLeaderboard = ref(false)
      const defaultQuestion = { text: '', answers: [] }
      const currentQuestion = ref(defaultQuestion)
      const playerList = ref([])
      playerList.value = [
            { name: route.query.username, points: 1200 },
            { name: 'Bob', points: 1500 },
            { name: 'Charlie', points: 800 }
          ];

      let webSocket = null

      const startGame = () => {
        currentQuestion.value.text =
          'In the alternate timeline in Mortal Kombat, which character was the one to slaughter the Shirai Ryu clan?? In the alternate timeline in Mortal Kombat, which character was the one to slaughter the Shirai Ryu clan??'
        currentQuestion.value.answers = [
          'Vue.js',
          'Bootstrap super long string Bootstrap super long string',
          'React',
          'Angular'
        ]
        isGameStarted.value = true
      }

      const checkAnswer = (answer) => {
        return answer === 'Vue.js'
      }

      const submitAnswer = (answer) => {
        if (checkAnswer(answer)) {
          currentQuestion.value = defaultQuestion
          playerList.value = [
            { name: route.query.username, points: 1200 },
            { name: 'Bob', points: 1500 },
            { name: 'Charlie', points: 800 }
          ];
          showLeaderboard.value = true
        }
      }

      const connectWebSocket = () => {
        // Construct the WebSocket URL with parameters
        const username = route.query.username || 'Guest';
        let wsUrl = `${import.meta.env.VITE_API_URL}?username=${encodeURIComponent(username)}`;
        if (roomCode.value && roomCode.value.length > 0) {
          wsUrl = wsUrl + `&roomCode=${encodeURIComponent(roomCode.value)}`;
        }

        webSocket = new WebSocket(wsUrl);

        webSocket.onopen = () => {
          console.log('WebSocket connection opened');
        };

        webSocket.onmessage = (event) => {
          console.log('Message from server:', event.data);
          console.dir(event);
          // Handle incoming messages
        };

        webSocket.onerror = (error) => {
          console.error('WebSocket error:', error);
          router.replace({path: '/'});
        };

        webSocket.onclose = () => {
          console.log('WebSocket connection closed');
          router.replace({path: '/'});
        };
      };

      onMounted(() => {
        connectWebSocket();
      });

      onUnmounted(() => {
        if (webSocket) {
          webSocket.close();
        }
        router.replace({path: '/'});
      });

      return {
        roomCode,
        isGameStarted,
        currentQuestion,
        startGame,
        submitAnswer,
        showLeaderboard,
        playerList
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
    padding: 0.5rem 1rem;
    background-color: var(--color-background);
  }

  .header-logo {
    font-size: 2rem;
  }

  .room-code-container {
    display: flex;
  }

  .room-code-container h2 {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .room-code {
    display: flex;
    justify-content: center;
    align-items: center;

    width: fit-content;
    margin: 0.25rem;
    padding: 0 0.25rem;
    border-radius: 5px;
    border: 2px solid var(--color-border);
    background-color: var(--vt-c-white-mute);
    color: var(--vt-c-text-light-1);
  }
</style>

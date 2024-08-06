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
    <Loading v-if="!isConnected || isWaiting || isEndGame" :text="loadingText"/>
    <RoomSetup v-if="isConnected && !isWaiting && !isGameStarted && !showLeaderboard" :onStart="startGame" :players="playerList"/>
    <TriviaQuestion v-if="isConnected && isGameStarted && !isWaiting && !showLeaderboard" :question="currentQuestion" :onAnswer="submitAnswer" />
    <Leaderboard v-if="showLeaderboard" :players="playerList" />
  </div>
</template>

<script>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import RoomSetup from './RoomSetup.vue'
  import TriviaQuestion from './TriviaQuestion.vue'
  import Leaderboard from './Leaderboard.vue';
import Loading from './Loading.vue';

  export default {
    name: 'RoomPage',
    components: {
      RoomSetup,
      TriviaQuestion,
      Leaderboard,
      Loading
    },
    setup() {
      const route = useRoute()
      const router = useRouter()
      const roomCode = ref(route.params.roomCode || '')

      const isConnected = ref(false)
      const isEndGame = ref(false)
      const isWaiting = ref(false)
      const isGameStarted = ref(false)
      const showLeaderboard = ref(false)
      const defaultQuestion = { text: '', answers: [] }
      const currentQuestion = ref(defaultQuestion)
      const playerList = ref([])
      const loadingText = ref("Loading...")

      let webSocket = null

      const startGame = () => {
        webSocket.send(JSON.stringify({action: "startGame"}));
        loadingText.value = "Loading Game..."
        isWaiting.value = true;
      }

      const submitAnswer = (answer) => {
        loadingText.value = "Waiting for other players to answer..."
        isWaiting.value = true;
        webSocket.send(JSON.stringify({action: "submitAnswer", answer: answer}));
      }

      const decodeString = (string) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = string;
        return txt.value;
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
          
          const messageData = JSON.parse(event.data);

          switch(messageData.messageType) {
            case "RoomStatus":
              loadingText.value = "Loading Room...";
              isConnected.value = true;
              playerList.value = messageData.users;
              roomCode.value = messageData.roomCode;
              currentQuestion.value.text = decodeString(messageData.questionData.question);
              currentQuestion.value.answers = messageData.questionData.answers;
              break;
            
            case "StartRound":
              isWaiting.value = false;
              showLeaderboard.value = false;
              isGameStarted.value = true;
              playerList.value = messageData.users;
              currentQuestion.value.text = decodeString(messageData.questionData.question);
              currentQuestion.value.answers = messageData.questionData.answers;
              break;

            case "ShowLeaderboard":
              isWaiting.value = false;
              showLeaderboard.value = true;
              playerList.value = messageData.users;
              break;

            case "EndGame":
              loadingText.value = "Game Finished"
              isEndGame.value = true;
              isWaiting.value = false;
              showLeaderboard.value = true;
              isGameStarted.value = false;
              playerList.value = messageData.users;
              break;

            case "UserError":
              console.log('UserError occured.');
              webSocket.close();
              break;
          }
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
        playerList,
        loadingText,
        isConnected,
        isWaiting,
        isEndGame
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

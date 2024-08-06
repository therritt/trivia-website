<template>
  <div class="trivia-game">
    <div class="question-container" v-if="question">
      <h3>{{ question.text }}</h3>
    </div>
    <div class="answers-container">
      <button v-for="answer in question.answers" :key="answer" @click="submitAnswer(answer)">
        {{ answer }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TriviaQuestion',
    props: {
      question: {
        type: Object,
        default: () => ({ text: '', answers: [] })
      },
      onAnswer: {
        type: Function,
        required: true
      }
    },
    setup(props) {
      const submitAnswer = (answer) => {
        props.onAnswer(answer)
      }

      return {
        submitAnswer
      }
    }
  }
</script>

<style scoped>
  .trivia-game {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    width: 100%;
    height: 100%;
  }

  .question-container {
    flex: 1;

    max-width: 70%;
    width: fit-content;

    place-content: center;
    text-align: center;
    font-size: 2vw;
  }

  .answers-container {
    flex: 2;
    display: flex;
    flex-wrap: wrap;
    place-content: space-around;
    width: 100%;
  }

  .answers-container button {
    flex: 1 1 45%;
    margin: 0.5rem;
    text-overflow: clip;
    font-size: 3vw;
    min-height: 40%;
  }

  @media (max-width: 768px) {
    .question-container {
      font-size: 3.5vw;
    }

    .answers-container button {
      font-size: 5vw;
    }
  }
</style>

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
  }

  .question-container {
    margin-bottom: 1rem;
  }

  .answers-container button {
    margin: 0.5rem;
  }
</style>

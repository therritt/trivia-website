<template>
    <div class="player-list">
      <h2>Player List</h2>
      <ul>
        <li v-for="player in players" :key="player.username">
          {{ player.username }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PlayerList',
    props: {
      players: {
        type: Array,
        required: true,
        default: () => [],
      },
    },
  };
  </script>
  
  <style scoped>
  .player-list {
    padding: 1rem;
    background-color: var(--color-background);
    border-radius: 6px;
    color: var(--trivia-cyan);
  }
  
  .player-list h2 {
    text-align: center;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid var(--trivia-red);
  }
  
  .player-list ul {
    list-style-type: none;
    padding: 0;
  }
  
  .player-list li {
    padding: 0.5rem;
    text-align: center;
  }
  
  .player-list li:last-child {
    border-bottom: none;
  }
  </style>
  
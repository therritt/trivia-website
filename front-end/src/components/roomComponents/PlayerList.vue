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
    background-color: var(--color-background-mute);
    border: 1px solid var(--color-background);
    border-radius: 4px;
  }
  
  .player-list h2 {
    margin-bottom: 0.5rem;
  }
  
  .player-list ul {
    list-style-type: none;
    padding: 0;
  }
  
  .player-list li {
    padding: 0.5rem 0;
    border: 1px solid var(--color-background);
  }
  
  .player-list li:last-child {
    border-bottom: none;
  }
  </style>
  
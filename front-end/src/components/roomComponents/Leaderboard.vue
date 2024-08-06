<template>
    <div class="leaderboard">
      <h1>Leaderboard</h1>
      <ul>
        <li v-for="entry in sortedEntries" :key="entry.correctAnswers">
          <span class="name">{{ entry.username }}</span>
          <span class="points">{{ entry.correctAnswers }} pts</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  // Define props
  const props = defineProps({
    players: {
      type: Array,
      required: true
    }
  });
  
  // Sort entries by points in descending order
  const sortedEntries = computed(() => {
    return [...props.players].sort((a, b) => b.points - a.points);
  });
  </script>
  
  <style scoped>
  .leaderboard {
    width: 300px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .name {
    font-weight: bold;
    color: var(--trivia-cyan);
  }
  
  .points {
    color: var(--trivia-cyan);
  }
  </style>
  
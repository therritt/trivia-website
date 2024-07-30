<template>
    <div class="room-page">
      <h2>Room: {{ roomName }}</h2>
      <!-- Implement game UI and logic here -->
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    name: 'RoomPage',
    setup() {
      const route = useRoute();
      const roomName = computed(() => route.params.roomName);
  
      return {
        roomName,
      };
    },
  };
  </script>
  
  <style>
  .room-page {
    text-align: center;
  }
  </style>
  
<template>
    <div class="create-room">
      <h2>{{text}}</h2>
    </div>
  </template>
  
  <script>
    export default {
      name: 'Loading',
      props: {
      text: {
        type: String,
        required: true,
        default: () => "Loading...",
      },
    },
    }
  </script>
  
  <style scoped>
    div {
        display: flex;
        place-content: center;
        text-align: center;
        width: 100%;
    }
  
    input {
      margin: 10px;
    }
  
    button {
      margin: 10px;
    }
  </style>
  
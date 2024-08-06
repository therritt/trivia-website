const redis = require('/opt/node_modules/redis');

// Create a Redis client
const client = redis.createClient({
  socket: {
    host: process.env.REDIS_ENDPOINT,
    port: process.env.REDIS_PORT,
    tls: true
  }
});

let isRedisConnected = false;
const connectRedis = async () => {
  if (!isRedisConnected) {
    await client.connect();
    isRedisConnected = true;
  }
};

// Lambda handler function
exports.handler = async (event) => {
  await connectRedis();

  try {
    let roomCode = event.roomId || await client.get(event.userId);

    const roomKey = `room:${roomCode}`;

    const questions = event.questions;
    const nextQuestion = questions.pop();

    await client.multi()
      .hSet(roomKey, "question", JSON.stringify(nextQuestion))
      .exec();

    return {
        messageType: "StartRound",
        roomId: roomCode,
        questions: questions,
        remainingQuestions: questions.length
    };

  } catch (error) {
    console.error('Error starting round:', error);
    return userErrorMessage;
  }
};

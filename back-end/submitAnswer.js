const redis = require('/opt/node_modules/redis');

// Create a Redis client
const client = redis.createClient({
  socket: {
    host: process.env.REDIS_ENDPOINT,
    port: process.env.REDIS_PORT
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
    const userId = event.requestContext.connectionId;
    const roomCode = await client.get(userId);
    const roomKey = `room:${roomCode}`;

    const currentUser = JSON.parse(await client.hGet(roomKey, userId));
    const currentQuestion = JSON.parse(await client.hGet(roomKey, "question"));
    
    if (currentQuestion.correctAnswer === JSON.parse(event.body).answer) {
      console.log("Correct Answer!")
      currentUser.correctAnswers = currentUser.correctAnswers + 1;
    }

    await client.hSet(roomKey, userId, JSON.stringify(currentUser));

    return {
      statusCode: 200
    }

  } catch (error) {
    console.error('Error submitting response:', error);
    return {
      statusCode: 500
    };
  }
};

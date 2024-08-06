const redis = require('/opt/node_modules/redis');
const crypto = require('crypto');

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
  const userId = event.userId;
  const userErrorMessage = {
    messageType: "UserError",
    userId: userId
  };
  
  await connectRedis();

  try {
    const roomCode = crypto.randomBytes(4).toString('hex').toUpperCase();
    const exists = await client.exists(`room:${roomCode}`);
    if (exists === 1) {
      console.error('Room code already exists');
      return userErrorMessage;
    }

    const userData = { correctAnswers: 0, username: event.username};
    const roomKey = `room:${roomCode}`;

    const roomStatusMessage = {
      messageType: "RoomStatus",
      roomId: roomCode
    };

    await client.multi()
      .hSet(roomKey, userId, JSON.stringify(userData))
      .hSet(roomKey, "question", JSON.stringify({question: "", answers: [], correctAnswer: ""}))
      .set(userId, roomCode)
      .expire(roomKey, 1800)
      .expire(userId, 1800)
      .exec();

    return roomStatusMessage;

  } catch (error) {
    console.error('Error generating room code:', error);
    return userErrorMessage;
  }
};

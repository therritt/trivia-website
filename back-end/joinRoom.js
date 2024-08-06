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
  const userId = event.userId;
  const roomCode = event.roomId;
  const userErrorMessage = {
    messageType: "UserError",
    userId: userId
  };
  const roomStatusMessage = {
    messageType: "RoomStatus",
    roomId: roomCode
  };

  await connectRedis();

  try {
    const exists = await client.exists(`room:${roomCode}`);
    if (exists === 0) {
      console.error('Room does not exist');
      return userErrorMessage;
    }

    const userData = { correctAnswers: 0, username: event.username};
    const roomKey = `room:${roomCode}`;

    await client.multi()
      .hSet(roomKey, userId, JSON.stringify(userData))
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

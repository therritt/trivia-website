const redis = require('/opt/node_modules/redis');

// Create a Redis client
const client = redis.createClient({
  host: process.env.REDIS_ENDPOINT,
  port: process.env.REDIS_PORT
});

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

  try {
    await client.connect();

    const exists = await client.exists(`room:${roomCode}`);
    if (exists === 0) {
      // Room code already exists
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

    return {
      statusCode: 200,
      body: JSON.stringify(roomStatusMessage)
    };

  } catch (error) {
    console.error('Error generating room code:', error);
    return {
      statusCode: 500,
      body: userErrorMessage
    };
  } finally {
    await client.quit();
  }
};

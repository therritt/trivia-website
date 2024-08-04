const redis = require('/opt/node_modules/redis');
const crypto = require('crypto');

// Create a Redis client
const client = redis.createClient({
  host: process.env.REDIS_ENDPOINT,
  port: process.env.REDIS_PORT
});

// Lambda handler function
exports.handler = async (event) => {
  try {
    const roomCode = crypto.randomBytes(4).toString('hex').toUpperCase();

    // Check if the room code already exists in Redis
    client.exists(`room:${roomCode}`, async (err, exists) => {
      if (err) {
        console.error('Error checking room existence:', err);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Error checking room existence' })
        };
      }

      if (exists === 1) {
        // Room code already exists, generate a new one
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Room code already exists' })
        };
      } else {
        // Room code is unique, proceed to create the room
        const userId = JSON.parse(event.body).userId;
        const userData = { correctAnswers: 0, host: true };
        const roomKey = `room:${roomCode}`;
        const userKey = `user:${userId}`;

        // Use a multi/exec transaction for atomicity
        client.multi()
          .hset(roomKey, userId, JSON.stringify(userData))
          .hset('userRooms', userId, roomCode)
          .expire(roomKey, 1800)
          .expire(userKey, 1800)
          .exec((err, replies) => {
            if (err) {
              console.error('Error creating room:', err);
              return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Failed to create room' })
              };
            } else {
              console.log(`Room ${roomCode} created with host ${userId}`);
              return {
                statusCode: 200,
                body: JSON.stringify({ message: `Room ${roomCode} created successfully` })
              };
            }
          });
      }
    });
  } catch (error) {
    console.error('Error generating room code:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error generating room code' })
    };
  }
};

const redis = require('/opt/node_modules/redis');

// Create a Redis client
const client = redis.createClient({
  host: process.env.REDIS_ENDPOINT,
  port: process.env.REDIS_PORT
});

// Lambda handler function
exports.handler = async (event) => {
  const { userId, roomId } = JSON.parse(event.body);

  // Check if room exists
  client.exists(`room:${roomId}`, (err, exists) => {
    if (err) {
      console.error('Error checking room existence:', err);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error checking room existence' })
      };
    }

    if (exists === 1) {
      // Room exists, proceed to add user
      const userData = { correctAnswers: 0 };
      const roomKey = `room:${roomId}`;
      const userKey = `user:${userId}`;

      // Use a multi/exec transaction for atomicity
      client.multi()
        .hset(roomKey, userId, JSON.stringify(userData))
        .hset('userRooms', userId, roomId)
        .expire(roomKey, 1800)
        .expire(userKey, 1800)
        .exec((err, replies) => {
          if (err) {
            console.error('Error adding user to room:', err);
            return {
              statusCode: 500,
              body: JSON.stringify({ message: 'Failed to add user to room' })
            };
          } else {
            console.log(`User ${userId} added to room ${roomId}`);
            return {
              statusCode: 200,
              body: JSON.stringify({ message: 'User added to room successfully' })
            };
          }
        });
    } else {
      // Room does not exist
      console.log(`Room ${roomId} does not exist`);
      return {
        statusCode: 404,
        body: JSON.stringify({ message: `Room ${roomId} does not exist` })
      };
    }
  });
};

const redis = require('/opt/node_modules/redis');

// Create a Redis client
const client = redis.createClient({
  host: process.env.REDIS_ENDPOINT,
  port: process.env.REDIS_PORT
});

// Lambda handler function
exports.handler = async (event) => {
  const { userId } = event.requestContext.connectionId;

  // Fetch the current room ID from userRooms hash
  client.hget('userRooms', userId, (err, roomId) => {
    if (err) {
      console.error('Error fetching room ID:', err);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error fetching room ID' })
      };
    }

    if (!roomId) {
      console.log(`User ${userId} is not in any room`);
      return {
        statusCode: 404,
        body: JSON.stringify({ message: `User ${userId} is not in any room` })
      };
    }

    // Use a multi/exec transaction for atomicity
    client.multi()
      .hdel(`room:${roomId}`, userId) // Remove user from room
      .hdel('userRooms', userId) // Remove room reference from userRooms
      .exec((err, replies) => {
        if (err) {
          console.error('Error removing user from room:', err);
          return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to remove user from room' })
          };
        } else {
          console.log(`User ${userId} removed from room ${roomId}`);
          return {
            statusCode: 200,
            body: JSON.stringify({ message: `User ${userId} removed from room ${roomId}` })
          };
        }
      });
  });
};

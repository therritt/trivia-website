const redis = require('/opt/node_modules/redis');

// Create a Redis client
const client = redis.createClient({
  socket: {
    host: process.env.REDIS_ENDPOINT,
    port: process.env.REDIS_PORT
  }
});

// Lambda handler function
exports.handler = async (event) => {
  const userId = event.requestContext.connectionId;

  try {
    await client.connect();
    const roomId = await client.get(userId);

    if (!roomId) {
      console.log(`User ${userId} is not in any room`);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: `User ${userId} is not in any room` })
      };
    }

    await client.multi()
      .hDel(`room:${roomId}`, userId)
      .del(userId)
      .exec();

    console.log(`User ${userId} removed from room ${roomId}`);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `User ${userId} removed from room ${roomId}` })
    };

  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to remove user from room' })
    };
  }
  finally {
    client.quit();
  }
};

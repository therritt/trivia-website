const { ApiGatewayManagementApiClient, PostToConnectionCommand} = require("@aws-sdk/client-apigatewaymanagementapi");
const redis = require('/opt/node_modules/redis');

const redisClient = redis.createClient({
  host: process.env.REDIS_ENDPOINT,
  port: process.env.REDIS_PORT
});

const apiClient = new ApiGatewayManagementApiClient({ endpoint: process.env.CONNECTION_URL });
        
exports.handler = async (event) => {
    const messageType = event.messageType;
    switch (messageType) {
        case "RoomStatus":
            const roomId = event.roomId;

            if (roomId) {
                await redisClient.connect();
                const roomData = JSON.parse(await redisClient.hGetAll(`room:${roomId}`));
                const userArray = [];
                const connectionArray = [];

                for (const user in roomData) {
                    connectionArray.push(user);
                    userArray.push(roomData);
                }

                const promises = connectionArray.map(connection => {
                    const message = new PostToConnectionCommand({
                        ConnectionId: connection,
                        Data: JSON.stringify({
                            messageType: messageType,
                            message: roomData
                        })
                    });
                    return apiClient.send(message); // Return the promise
                });
        
                // Use Promise.all to send all messages concurrently
                await Promise.all(promises);
            }
            break;
        
        case "UserError":
            const userId = event.userId;

            if (userId) {
                await apiClient.send(new PostToConnectionCommand({ ConnectionId: userId, Data: JSON.stringify({
                        messageType: messageType,
                    })
                }));
            }
            break;
        default:
            break;
    }

    console.dir(event);
    return { statusCode: 200 };
};

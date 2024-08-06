const redis = require('/opt/node_modules/redis');

const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_ENDPOINT,
        port: process.env.REDIS_PORT
    }
});

let isRedisConnected = false;
const connectRedis = async () => {
  if (!isRedisConnected) {
    await redisClient.connect();
    isRedisConnected = true;
  }
};
        
exports.handler = async (event) => {
    try {
        const messageType = event.messageType;
        await connectRedis();
        switch (messageType) {
            case "EndGame":
            case "ShowLeaderboard":
            case "StartRound":
            case "RoomStatus":
                const roomId = event.roomId;
    
                if (roomId) {
                    const roomData = await redisClient.hGetAll(`room:${roomId}`);
                    const userArray = [];
                    const connectionArray = [];
    
                    for (const user in roomData) {
                        if (user !== "question") {
                            connectionArray.push(user);
                            userArray.push(JSON.parse(roomData[user]));
                        }
                    }
                    
                    const questionData = JSON.parse(roomData["question"]);
                    
                    const stringData = JSON.stringify({
                        messageType: messageType,
                        roomCode: roomId,
                        users: userArray,
                        questionData: {question: questionData.question, answers: questionData.answers}
                    });
    
                    return {
                      connections: connectionArray,
                      data: stringData
                    };
                }
                break;
            
            case "UserError":
                const userId = event.userId;
                if (userId) {
                    return {
                      connections: [userId],
                      data: JSON.stringify({messageType: "UserError"})
                    };
                }
                break;
            default:
                break;
        }
    
        console.dir(event);
        return { statusCode: 200 };
    }
    catch(e) {
        console.error('Error sending messages:', e);
    }
};

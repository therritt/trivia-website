const { ApiGatewayManagementApiClient, PostToConnectionCommand} = require("@aws-sdk/client-apigatewaymanagementapi");
const apiClient = new ApiGatewayManagementApiClient({ endpoint: process.env.CONNECTION_URL });
        
exports.handler = async (event) => {
    try {
        const promises = event.connections.map(async (connection) => {
            const command = new PostToConnectionCommand({
                ConnectionId: connection,
                Data: event.data
            });
            return apiClient.send(command);
        });
    
        return await Promise.all(promises);
    }
    catch(e) {
        console.error('Error sending messages:', e);
    }
};

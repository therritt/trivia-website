const { ApiGatewayManagementApiClient, PostToConnectionCommand} = require("@aws-sdk/client-apigatewaymanagementapi");
const client = new ApiGatewayManagementApiClient({ endpoint: process.env.CONNECTION_URL });
  
exports.handler = async (event) => {
  const connectionId = event.requestContext.connectionId;
  const message = new PostToConnectionCommand({ ConnectionId: connectionId, Data: "Game started" });
  await client.send(message);

  const response = { statusCode: 200 };
  return response;
};

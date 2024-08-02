import {
    ApiGatewayManagementApiClient,
    PostToConnectionCommand,
  } from "@aws-sdk/client-apigatewaymanagementapi";


  const client = new ApiGatewayManagementApiClient({ endpoint: CONNECTION_URL });
  
  export const handler = async (event) => {
    const connectionId = event.requestContext.connectionId;
    const message = new PostToConnectionCommand({ ConnectionId: connectionId, Data: "Game started" });
    await client.send(message);
    const response = {
      statusCode: 200
    };
    return response;
  };
  
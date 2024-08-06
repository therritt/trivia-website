const { SFNClient, StartExecutionCommand } = require("@aws-sdk/client-sfn");

exports.handler = async (event) => {
  const client = new SFNClient();

  const input = JSON.stringify({
    userId: event.requestContext.connectionId,
    username: event.queryStringParameters.username || 'Guest',
    roomId: event.queryStringParameters.roomCode || undefined
  });

  const params = {
    stateMachineArn: process.env.SFN_ARN,
    input: input
  };

  const command = new StartExecutionCommand(params);
  await client.send(command);

  return {statusCode: 200}
}

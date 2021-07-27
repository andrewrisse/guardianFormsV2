"use strict";
// import 'source-map-support/register'
//
// import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
// import { createLogger } from '../../utils/logger'
// import { getUploadUrl } from '../../businessLogic/surveys'
// const logger = createLogger('generateUploadUrl')
//
//
//
// export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//   logger.info("Processing event: " , event);
//
//   const todoId = event.pathParameters.todoId
//   const url = getUploadUrl(todoId);
//
//   return {
//     statusCode: 201,
//     headers: {
//       'Access-Control-Allow-Origin' : "*"
//     },
//     body: JSON.stringify({
//       uploadUrl: url
//     })
//   }
//
// }
//
//
//# sourceMappingURL=generateUploadUrl.js.map
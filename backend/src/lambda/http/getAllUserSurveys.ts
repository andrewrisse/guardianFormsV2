import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'
import { getAllUsersSurveys} from '../../businessLogic/surveys'


const logger = createLogger('getTodos')


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info("Processing event: " , event);

  const userId = getUserId(event); // todo this is using decodedJwt.sub as the user id, change this on the frontend in newSurveyForm to match

  return getAllUsersSurveys(userId);

}

module.exports = {}






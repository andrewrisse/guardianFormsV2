import 'source-map-support/register'
import * as uuid from 'uuid';
import { createLogger } from '../utils/logger'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { TodoItem } from '../models/TodoItem'
import { DeleteTodoRequest } from '../requests/DeleteTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { Key } from 'aws-sdk/clients/dynamodb'
import connectToDatabase from "../dataLayer/database";
const todosTable = process.env.TODOS_TABLE;
const bucketName = process.env.ATTACHMENTS_S3_BUCKET;
const index = process.env.INDEX;
import Survey from '../models/survey';



const logger = createLogger('surveys')
const mongoClient = connectToDatabase();

/**
 * Get a query parameter or return "undefined"
 *
 * @param {Object} event HTTP event passed to a Lambda function
 * @param {string} name a name of a query parameter to return
 *
 * @returns {string} a value of a query parameter value or "undefined" if a parameter is not defined
 */
function getQueryParameter(event, name) {
  const queryParams = event.queryStringParameters
  if (!queryParams) {
    return undefined
  }

  return queryParams[name]
}

export const getAllUsersSurveys = async (ownerId: string
) => {
  logger.info("Owner Id: ", ownerId);

  //@ts-ignore
  const surveys = await Survey.find({ ownerId });
  logger.info("Result: " + surveys)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      surveys,
    })
  }
};


export const getTodos = async (userId: string, nextKey: Key, limit: string) => {

  const scanParams = {
    TableName: todosTable,
    IndexName: index,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId
    },
    limit,
    ExclusiveStartKey: nextKey
  }

  logger.info("Query params: ", scanParams);

  const result = await docClient.query(scanParams).promise()

  const items = result.Items

  logger.info("Result: " + result)

  // Return result
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items,
      // Encode the JSON object so a client can return it in a URL as is
      nextKey: encodeNextKey(result.LastEvaluatedKey)
    })
  }
}


export const createTodo =  async (createTodoRequest: CreateTodoRequest) => {


  const todoId = uuid.v4();
  const userId = createTodoRequest.userId;
  const name = createTodoRequest.name;
  const dueDate = createTodoRequest.dueDate;

  const newTodo: TodoItem = {
    userId,
    todoId,
    createdAt: new Date().toISOString(),
    name,
    dueDate,
    done: false,
    attachmentUrl: `https://${bucketName}.s3.amazonaws.com/${todoId}`
  }

  await docClient.put({
    TableName: todosTable,
    Item: newTodo
  }).promise();
  logger.info("Created todo: " , newTodo);
  return {
    statusCode: 201,
    headers: { 'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({item: newTodo})
  }

}

export const deleteTodo = async (deleteTodoRequest: DeleteTodoRequest) => {
  try{
    await docClient.delete({TableName: todosTable, Key: {todoId: deleteTodoRequest.todoId, userId: deleteTodoRequest.userId}}).promise()
    logger.info("Deleted Todo");
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin' : "*"
      },
      body: "Successfully deleted"
    }
  }
  catch(e){
    logger.error('Error deleting todo: ', e.message);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin' : "*"
      },
      body: JSON.stringify({
        error: "Error deleting todo"
      })

    }
  }
}

export const updateTodo = async (updateTodoRequest: UpdateTodoRequest) => {
  try{
    await docClient.update({TableName: todosTable,  Key: {
        userId: updateTodoRequest.userId,
        todoId: updateTodoRequest.todoId
      },
      ExpressionAttributeNames: {
        '#todo_name': 'name',
      },
      ExpressionAttributeValues: {
        ':name': updateTodoRequest.name,
        ':dueDate': updateTodoRequest.dueDate,
        ':done': updateTodoRequest.done,
      },
      UpdateExpression: 'SET #todo_name = :name, dueDate = :dueDate, done = :done',
      ReturnValues: 'UPDATED_NEW',
    }).promise();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin' : "*"
      },
      body: ""
    }
  }
  catch(error){
    logger.error("Error updating todo: " , error.message)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin' : "*"
      },
      body: JSON.stringify({
        error: "Error updating todo"
      })

    }
  }
}

import 'source-map-support/register'
import mongoose from "mongoose";
import { createLogger } from '../utils/logger'
import Survey from '../models/survey';
import Question from '../models/question';
import { ISurvey } from '../../../client/@types/survey';
import { ALLOWED_SURVEY_PATCH_FIELDS } from "../../@types/survey";


const logger = createLogger('surveys')

// /**
//  * Get a query parameter or return "undefined"
//  *
//  * @param {Object} event HTTP event passed to a Lambda function
//  * @param {string} name a name of a query parameter to return
//  *
//  * @returns {string} a value of a query parameter value or "undefined" if a parameter is not defined
//  */
// function getQueryParameter(event, name) {
//   const queryParams = event.queryStringParameters
//   if (!queryParams) {
//     return undefined
//   }
//
//   return queryParams[name]
// }

export const getAllUsersSurveys = async (ownerId: string
) => {
  logger.info("Owner Id: ", ownerId);

  // @ts-ignore
  const surveys = await Survey.find({ ownerId });
  logger.info("Result: " + surveys)
  return surveys;
};


export const createSurvey = async (surveyData: ISurvey) => {
  const questionsFromModel = [];
  for (const q of surveyData.questions) {
    const newQuestion = new Question({ ...q });
    questionsFromModel.push(newQuestion);
  }

  surveyData.questions = questionsFromModel;

  const newSurvey = new Survey(surveyData);
  await newSurvey.save();
  return newSurvey;
};

export const getSurvey = async (sid: string, ownerId: string) => {

  const survey = await Survey.findOne({ _id: mongoose.Types.ObjectId(sid) });
  if (!survey) throw new Error("Not Found");

  // Survey must be public or the user must be the survey owner to get the survey
  if (!survey.public && survey.ownerId !== ownerId)
    throw new Error('Forbidden');

  return survey;
};

export const updateSurvey = async (sid: string, ownerId: string, updatedFields: ISurvey) => {

  // Get survey data
  const survey = await Survey.findOne({ _id: mongoose.Types.ObjectId(sid) });
  if (!survey) throw new Error("Not Found");
    if (survey && survey.ownerId !== ownerId)
    // User must be the survey owner to update the survey
    throw new Error('Forbidden');

    return  updateSurveyLogic(sid as string, survey, updatedFields);
};


export const updateSurveyLogic = async (
  sid: string,
  survey: ISurvey,
  updatedFields: ISurvey
) => {
  const updatedSurvey = {};
  // Update only allowed fields
  let field: string;
  for (field of ALLOWED_SURVEY_PATCH_FIELDS) {
    if (field in updatedFields) {
      // @ts-ignore
      updatedSurvey[field] = updatedFields[field];
    }
  }

  await Survey.updateOne({ _id: mongoose.Types.ObjectId(sid) }, { $set: updatedSurvey });
  return updatedSurvey;
};


export const deleteSurvey = async (sid: string, ownerId: string,) => {

  const survey = await Survey.findOne({ _id: mongoose.Types.ObjectId(sid) });

  if (survey) {
    // Check user is the owner of this survey before deleting
    if (survey.ownerId !== ownerId) throw new Error('Forbidden');

    return Survey.deleteOne({ _id: mongoose.Types.ObjectId(sid) });

  } else {
    throw new Error('Not Found');
  }
};

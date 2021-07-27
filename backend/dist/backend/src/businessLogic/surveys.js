"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSurvey = exports.updateSurveyLogic = exports.updateSurvey = exports.getSurvey = exports.createSurvey = exports.getAllUsersSurveys = void 0;
require("source-map-support/register");
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../utils/logger");
const survey_1 = __importDefault(require("../models/survey"));
const question_1 = __importDefault(require("../models/question"));
const survey_2 = require("../../@types/survey");
const logger = logger_1.createLogger('surveys');
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
const getAllUsersSurveys = (ownerId) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info("Owner Id: ", ownerId);
    // @ts-ignore
    const surveys = yield survey_1.default.find({ ownerId });
    logger.info("Result: " + surveys);
    return surveys;
});
exports.getAllUsersSurveys = getAllUsersSurveys;
const createSurvey = (surveyData) => __awaiter(void 0, void 0, void 0, function* () {
    const questionsFromModel = [];
    for (const q of surveyData.questions) {
        const newQuestion = new question_1.default(Object.assign({}, q));
        questionsFromModel.push(newQuestion);
    }
    surveyData.questions = questionsFromModel;
    const newSurvey = new survey_1.default(surveyData);
    yield newSurvey.save();
    return newSurvey;
});
exports.createSurvey = createSurvey;
const getSurvey = (sid, ownerId) => __awaiter(void 0, void 0, void 0, function* () {
    const survey = yield survey_1.default.findOne({ _id: mongoose_1.default.Types.ObjectId(sid) });
    if (!survey)
        throw new Error("Not Found");
    // Survey must be public or the user must be the survey owner to get the survey
    if (!survey.public && survey.ownerId !== ownerId)
        throw new Error('Forbidden');
    return survey;
});
exports.getSurvey = getSurvey;
const updateSurvey = (sid, ownerId, updatedFields) => __awaiter(void 0, void 0, void 0, function* () {
    // Get survey data
    const survey = yield survey_1.default.findOne({ _id: mongoose_1.default.Types.ObjectId(sid) });
    if (!survey)
        throw new Error("Not Found");
    if (survey && survey.ownerId !== ownerId)
        // User must be the survey owner to update the survey
        throw new Error('Forbidden');
    return exports.updateSurveyLogic(sid, survey, updatedFields);
});
exports.updateSurvey = updateSurvey;
const updateSurveyLogic = (sid, survey, updatedFields) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedSurvey = {};
    // Update only allowed fields
    let field;
    for (field of survey_2.ALLOWED_SURVEY_PATCH_FIELDS) {
        if (field in updatedFields) {
            // @ts-ignore
            updatedSurvey[field] = updatedFields[field];
        }
    }
    yield survey_1.default.updateOne({ _id: mongoose_1.default.Types.ObjectId(sid) }, { $set: updatedSurvey });
    return updatedSurvey;
});
exports.updateSurveyLogic = updateSurveyLogic;
const deleteSurvey = (sid, ownerId) => __awaiter(void 0, void 0, void 0, function* () {
    const survey = yield survey_1.default.findOne({ _id: mongoose_1.default.Types.ObjectId(sid) });
    if (survey) {
        // Check user is the owner of this survey before deleting
        if (survey.ownerId !== ownerId)
            throw new Error('Forbidden');
        return survey_1.default.deleteOne({ _id: mongoose_1.default.Types.ObjectId(sid) });
    }
    else {
        throw new Error('Not Found');
    }
});
exports.deleteSurvey = deleteSurvey;
//# sourceMappingURL=surveys.js.map
import mongoose from 'mongoose';
import { questionSchema} from './question';
import {ISurvey} from "../../../@types/survey";

const surveySchema = new mongoose.Schema<ISurvey>({
  public: { type: Boolean, required: true },
  title: {type: String, required: true},
  description: {type: String, required: false},
  ownerId: { type: String, required: true },
  questions: { type: [questionSchema] , default: [], required: false},
  responsesId: { type: String }
});

export default mongoose.models.Survey || mongoose.model('Survey', surveySchema);

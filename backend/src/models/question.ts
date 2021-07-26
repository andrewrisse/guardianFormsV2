import mongoose from 'mongoose';
import { IQuestion } from '../../../@types/question';

export const questionSchema = new mongoose.Schema<IQuestion>({
  _id: {type: String, required: true},
  questionText: { type: String, required: true },
  scaleType: {
    type: String,
    enum: [
      'dichotomous',
      'numericalRating',
      'likert',
      'ranking',
      'semanticDifferential'
    ],
    default: 'likert',
    required: true
  },
  responsesId: { type: String, required: false }
});

export default mongoose.models.Question ||
  mongoose.model('Question', questionSchema);

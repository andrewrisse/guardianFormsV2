export interface IQuestion {
  _id: string;
  questionText: string;
  scaleType: IScaleType;
  responsesId?: string;
}

export type IScaleType =
  | 'dichotomous'
  | 'numericalRating'
  | 'likert'
  | 'ranking'
  | 'semanticDifferential';

export const ALLOWED_QUESTION_PATCH_FIELDS = ['questionText', 'scaleType'];

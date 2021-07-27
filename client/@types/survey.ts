import {IQuestion} from "./question";

export interface ISurvey {
    _id?: string;
    public: boolean;
    ownerId: string;
    title: string;
    description?: string;
    questions: IQuestion[];
    responsesId?: string;
}

export const ALLOWED_SURVEY_PATCH_FIELDS = ['public', 'title', 'description', 'questions'];

import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../store';
import axios from 'axios';
import { ISurvey } from '../../../@types/survey';
import { IQuestion } from '../../../@types/question';
import { makeBackendRequest } from '../../utils/backendRequestHelpers';

type SurveyState = {
  isLoading: boolean;
  error: boolean;
  editMode: boolean;
  activeSurvey: ISurvey;
  questionsInEditMode: IQuestion[];
};

const initialState: SurveyState = {
  isLoading: false,
  error: false,
  editMode: false,
  activeSurvey: {
    public: false,
    ownerId: '',
    title: '',
    description: '',
    questions: []
  },
  questionsInEditMode: []
};

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    // RESET STATE
    reset(state) {
      state = initialState
    },
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    // EDIT MODE
    setEditMode(state, action) {
      state.editMode = action.payload;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // GET SURVEY
    getSurveySuccess(state, action) {
      state.isLoading = false;
      state.activeSurvey = action.payload
    },

    createSurveySuccess(state) {
      state.isLoading = false;
      state.activeSurvey = initialState.activeSurvey;
    },
    deleteSurveySuccess(state) {
      state.isLoading = false;
      state.activeSurvey = initialState.activeSurvey;
    },
    addSurveyQuestion(state, action) {
      state.activeSurvey.questions = [
        ...state.activeSurvey.questions,
        action.payload
      ];
    },
    removeSurveyQuestion(state, action) {
      state.activeSurvey.questions = state.activeSurvey.questions.filter(
        (item) => item._id !== action.payload._id
      );
    },
    updateSurveyQuestion(state, action) {
      state.activeSurvey.questions = state.activeSurvey.questions.map(
        (item) => {
          if (item._id !== action.payload._id) {
            // This isn't the item we care about - keep it as-is
            return item;
          }

          // Otherwise, this is the one we want - return an updated value
          return {
            ...item,
            ...action.payload
          };
        }
      );
    },

    setQuestionInEditMode(state, action) {
      state.questionsInEditMode = [
        ...state.questionsInEditMode,
        action.payload
      ];
    },
    setQuestionInViewMode(state, action) {
      state.questionsInEditMode = state.questionsInEditMode.filter(
        (item) => item._id !== action.payload._id
      );
    }
  }
});

export const isElementInEditMode = (
  questionToFind: IQuestion,
  arr: IQuestion[]
) => arr.find((question) => question._id === questionToFind._id);

export function deleteSurvey(sid: ISurvey) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/api/surveys/${sid}`);
      dispatch(slice.actions.deleteSurveySuccess());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export async function createSurvey(newSurvey: ISurvey, token: string) {
  dispatch(slice.actions.startLoading());
  try {
    await makeBackendRequest('POST', 'surveys', token, newSurvey);
    dispatch(slice.actions.createSurveySuccess());
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
}

export async function getSurvey(surveyId: string, token: string) {
  dispatch(slice.actions.startLoading());
  try {
    const res = await makeBackendRequest('GET', `surveys/${surveyId}`, token);
    dispatch(slice.actions.getSurveySuccess(res));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
}


// Reducer
export default slice.reducer;

// Actions
export const {
  setEditMode,
  addSurveyQuestion,
  removeSurveyQuestion,
  updateSurveyQuestion,
  setQuestionInEditMode,
  setQuestionInViewMode
} = slice.actions;

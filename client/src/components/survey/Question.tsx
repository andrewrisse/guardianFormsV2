import axios from 'axios';
import { Card, CardHeader, IconButton, Stack } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import NewQuestionForm from './NewQuestionForm';
import { useEffect, useState } from 'react';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { RootState, useDispatch, useSelector } from '../../redux/store';
import {
  isElementInEditMode,
  removeSurveyQuestion,
  setQuestionInEditMode,
  setQuestionInViewMode
} from '../../redux/slices/survey';
import { IQuestion } from '../../../../@types/question';

type QuestionProps = {
  question?: IQuestion;
};

const Question = ({ question }: QuestionProps) => {
  const questionsInEditMode = useSelector(
    (state: RootState) => state.survey.questionsInEditMode
  );
  const [editMode, setInEditMode] = useState(
    question ? isElementInEditMode(question, questionsInEditMode) : false
  );
  const isMounted = useIsMountedRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (question && isElementInEditMode(question, questionsInEditMode))
      setInEditMode(true);
    else if (question && !isElementInEditMode(question, questionsInEditMode))
      setInEditMode(false);
  }, [question, questionsInEditMode]);

  const onDeleteClickHandler = async () => {
    dispatch(removeSurveyQuestion(question));
  };

  const onEditHandler = () => {
    dispatch(setQuestionInEditMode(question));
  };

  if (isMounted && question) {
    return editMode ? (
      <NewQuestionForm question={question} />
    ) : (
      <Card sx={{ p: 3, m: 2 }}>
        <CardHeader title={question.questionText} sx={{ mb: 3, p: 2 }} />
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <IconButton onClick={onEditHandler}>
            <CreateIcon />
          </IconButton>

          <IconButton onClick={onDeleteClickHandler}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Card>
    );
  } else return <></>;
};

export default Question;

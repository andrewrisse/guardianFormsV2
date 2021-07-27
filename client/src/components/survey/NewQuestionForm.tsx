import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import * as uuid from 'uuid';
import { Form, FormikProvider, useFormik } from 'formik';
import {
  Card,
  CardHeader,
  Grid,
  IconButton,
  TextField
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { LoadingButton } from '@material-ui/lab';
import CancelIcon from '@material-ui/icons/Cancel';

import { RootState, useDispatch, useSelector } from '../../redux/store';
import {
  addSurveyQuestion,
  isElementInEditMode,
  setQuestionInViewMode,
  updateSurveyQuestion
} from '../../redux/slices/survey';
import { IQuestion } from '../../../@types/question';

interface InitialState extends Omit<IQuestion, '_id'> {
  afterSubmit?: string;
}

type NewQuestionFormProps = {
  question?: IQuestion;
};

// todo add spinner
const NewQuestionForm = ({ question }: NewQuestionFormProps) => {
  const dispatch = useDispatch();
  const questionsInEditMode = useSelector(
    (state: RootState) => state.survey.questionsInEditMode
  );
  const [editMode, setInEditMode] = useState(
    question ? isElementInEditMode(question, questionsInEditMode) : false
  );

  useEffect(() => {
    if (question && isElementInEditMode(question, questionsInEditMode))
      setInEditMode(true);
    else if (question && !isElementInEditMode(question, questionsInEditMode))
      setInEditMode(false);
  }, [question, questionsInEditMode]);

  const NewQuestionSchema = Yup.object().shape({
    questionText: Yup.string().required('Question text is required'),
    scaleType: Yup.string().required('Scale type is required')
  });

  const handleEdit = (values: IQuestion) => {
    dispatch(
      updateSurveyQuestion(
        question?._id
          ? { ...values, _id: question._id }
          : { ...values, _id: uuid.v4() }
      )
    );
    dispatch(setQuestionInViewMode(question));
  };

  const handleAdd = (values: IQuestion) => {
    dispatch(addSurveyQuestion({ ...values, _id: uuid.v4() }));
    resetForm();
  };

  const handleCancelClick = () => {
    dispatch(setQuestionInViewMode(question));
  };

  const formik = useFormik<InitialState>({
    enableReinitialize: true,
    initialValues: {
      questionText: question ? question!.questionText : '',
      scaleType: question ? question!.scaleType : 'likert'
    },
    validationSchema: NewQuestionSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        editMode
          ? handleEdit(values as IQuestion)
          : handleAdd(values as IQuestion);
        setSubmitting(false);
      } catch (error) {
        setErrors({ afterSubmit: error.code, questionText: error.message });
        setSubmitting(false);
      }
    }
  });

  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    resetForm
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Card sx={{ p: 3, m: 2 }}>
          <CardHeader
            title={question ? 'Edit Question' : 'New Question'}
            sx={{ mb: 3, p: 2 }}
          />
          <Grid container item xs={12}>
            <Grid item xs={12} sx={{ mb: 1, p: 2 }}>
              <TextField
                fullWidth
                label={'Question'}
                {...getFieldProps('questionText')}
                error={Boolean(touched.questionText && errors.questionText)}
                helperText={touched.questionText && errors.questionText}
              />
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                {question && (
                  <IconButton onClick={handleCancelClick}>
                    <CancelIcon />
                  </IconButton>
                )}
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  {!editMode ? 'Add' : 'Save Changes'}
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Form>
    </FormikProvider>
  );
};

export default NewQuestionForm;

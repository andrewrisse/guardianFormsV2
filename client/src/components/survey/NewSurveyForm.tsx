import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';

import {
  Card,
  CardHeader,
  Stack,
  TextField,
  Grid,
  Snackbar
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { LoadingButton } from '@material-ui/lab';
import { useAuth0 } from "@auth0/auth0-react";

import Question from './Question';
import NewQuestionForm from './NewQuestionForm';
// redux
import { RootState, useSelector } from '../../redux/store';
import { createSurvey } from '../../redux/slices/survey';
import { ISurvey } from '../../../../@types/survey';
import { IQuestion } from '../../../../@types/question';

interface InitialState extends Omit<ISurvey, 'questions'> {
  afterSubmit?: string;
}

// TODO add delete button
const NewSurveyForm = () => {
  const {user} = useAuth0();

  useEffect(() => {
  console.log(user)
  }, )

  const [open, setOpen] = useState(false);
  const isLoading = useSelector((state: RootState) => state.survey.isLoading);
  const editMode = useSelector((state: RootState) => state.survey.editMode);

  const activeSurvey = useSelector(
    (state: RootState) => state.survey.activeSurvey
  );

  const NewSurveySchema = Yup.object().shape({
    public: Yup.boolean(),
    ownerId: Yup.string().required('Owner Id is required'),
    title: Yup.string().required('Title is required'),
    description: Yup.string(),
    questions: Yup.array()
  });

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const formik = useFormik<InitialState>({
    enableReinitialize: true,
    initialValues: {
      public: activeSurvey.public,
      ownerId: activeSurvey.ownerId || "123", //todo should be uid from token
      title: activeSurvey.title || '',
      description: activeSurvey.description || ''
    },
    validationSchema: NewSurveySchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        // TODO if edit mode do patch
          if(editMode){
            // TODO patch survey
          }else{
            await createSurvey({
              questions: activeSurvey.questions,
              ...values
            } as ISurvey);
          }

        setOpen(true);
        setSubmitting(false);
        resetForm();
      } catch (error) {
        setErrors({ afterSubmit: error.code });
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

  return isLoading ? (
    <div>Loading ... </div>
  ) : (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Card sx={{ p: 3 }}>
            <CardHeader title="Survey Info" sx={{ mb: 3, p: 2 }} />

            <Stack>
              {
                <Box
                  sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}
                >
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    {editMode ? 'Save' : 'Create Survey'}
                  </LoadingButton>
                </Box>
              }
            </Stack>
            <Grid container item xs={12}>
              <Grid item xs={12} sx={{ mb: 1, p: 2 }}>
                <TextField
                  fullWidth
                  label={'Survey Title'}
                  {...getFieldProps('title')}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: 1, p: 2 }}>
                <TextField
                  fullWidth
                  label={'Survey Description'}
                  {...getFieldProps('description')}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Grid>
            </Grid>
          </Card>
        </Form>
      </FormikProvider>
      {activeSurvey.questions.map((q: IQuestion, i: number) => (
        <Question key={i} question={q} />
      ))}

      {<NewQuestionForm />}

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Survey created!"
      />
    </>
  );
};

export default NewSurveyForm;

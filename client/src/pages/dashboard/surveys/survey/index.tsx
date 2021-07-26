import { useDispatch } from 'react-redux';
import {useParams} from "react-router-dom";
import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { getSurvey, setEditMode } from '../../../../redux/slices/survey';
import NewSurveyForm from '../../../../components/survey/NewSurveyForm';

const SurveyDetails = () => {
  const {sid} = useParams();
  const dispatch = useDispatch();


  useEffect(() => {
    async function fetchSurvey() {
      await getSurvey(sid as string);
    }
    if (sid) {
      fetchSurvey();
      dispatch(setEditMode(true));
    }
  }, [sid, dispatch]);

  return (
    <>
     <Helmet>
          <title>Survey | Guardian Forms</title>
     </Helmet>
     <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
        >
          <Container>
            <Grid container spacing={3}>
              <Grid item sm={9} xs={12}>
                <NewSurveyForm />
              </Grid>
            </Grid>
          </Container>
     </Box>
    </>
  );
};

export default SurveyDetails;

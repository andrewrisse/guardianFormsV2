import { useDispatch } from 'react-redux';
import {useParams} from "react-router-dom";
import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { getSurvey, setEditMode } from '../../../../redux/slices/survey';
import NewSurveyForm from '../../../../components/survey/NewSurveyForm';
import { useAuth0 } from '@auth0/auth0-react';

const SurveyDetails = () => {
  const { getIdTokenClaims } = useAuth0();
  const {sid} = useParams();
  const dispatch = useDispatch();


  useEffect(() => {
    async function fetchSurvey() {
      const idTokenClaims = await getIdTokenClaims();
     const token =  idTokenClaims.__raw;
      await getSurvey(sid as string, token);
    }
    if (sid) {
      fetchSurvey();
      dispatch(setEditMode(true));
    }
  }, [sid, dispatch, getIdTokenClaims]);

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

import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Page from '../../../../components/Page';
import NewSurveyForm from '../../../../components/survey/NewSurveyForm';


const NewSurvey = () => (
  <Page title="New Survey | GuardianForms">
      <Helmet>
        <title>New Survey | Guardian Forms</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <NewSurveyForm />
        </Container>
      </Box>
  </Page>
);

export default NewSurvey;

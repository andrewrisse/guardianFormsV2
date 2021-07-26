import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import DashboardLayout from '../../../../layouts/dashboard/DashboardLayout';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Page from '../../../../components/Page';
import NewSurveyForm from '../../../../components/survey/NewSurveyForm';


const NewSurvey = () => (
  <Page title="New Survey | GuardianForms">

    <DashboardLayout>
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
    </DashboardLayout>

  </Page>
);

export default NewSurvey;

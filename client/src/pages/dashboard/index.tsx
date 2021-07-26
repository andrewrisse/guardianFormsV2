import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Page from '../../components/Page';

const Dashboard = () => (
  <Page title="Dashboard | GuardianForms">

      <Helmet>
        <title>Dashboard | Guardian Forms</title>
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
              <Typography>Dashboard</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
  </Page>
);

export default Dashboard;

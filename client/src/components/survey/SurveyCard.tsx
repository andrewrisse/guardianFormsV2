import { FC } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Link,
  Typography
} from '@material-ui/core';
import { green, orange } from '@material-ui/core/colors';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { ISurvey } from '../../../../@types/survey';

type ISurveyCardProps = {
  survey: ISurvey;
};

const SurveyCard: FC<ISurveyCardProps> = ({ survey }) => {

  return (
      <Link href={`surveys/${survey._id}`}>
          <Card sx={{ m: 3, p: 2 }}>
              <CardContent>
                  <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
                      <Grid item>
                          <Typography color="textSecondary" gutterBottom variant="h6">
                              SURVEY: {survey.title}
                          </Typography>
                      </Grid>
                      <Grid item>
                          <Avatar
                              sx={{
                                  backgroundColor: orange[600],
                                  height: 56,
                                  width: 56
                              }}
                          >
                              <AssignmentIcon />
                          </Avatar>
                      </Grid>
                  </Grid>
                  <Box
                      sx={{
                          pt: 2,
                          display: 'flex',
                          alignItems: 'center'
                      }}
                  >
                      <Typography
                          sx={{
                              color: green[900],
                              mr: 1
                          }}
                          variant="body2"
                      >
                          {survey.questions?.length}
                      </Typography>
                      <Typography color="textSecondary" variant="caption">
                          Total Questions
                      </Typography>
                  </Box>
              </CardContent>
          </Card>
      </Link>

  );
};

export default SurveyCard;

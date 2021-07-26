import {
  Typography
} from '@material-ui/core';

import Page from '../../../components/Page';
import SurveyCard from '../../../components/survey/SurveyCard';
import { ISurvey } from '../../../../../@types/survey';


const SurveysList = () => {
  const surveys: ISurvey[] = [] // todo connect to backend
  return (
    <Page title="My Surveys | GuardianForms">
      {
        surveys ?
          <ul>
            {surveys.map((survey: ISurvey) => (
               <SurveyCard key={survey._id} survey={survey} />
            ))}
          </ul> :
          <Typography>Loading ... </Typography>}
    </Page>)
};

export default SurveysList;

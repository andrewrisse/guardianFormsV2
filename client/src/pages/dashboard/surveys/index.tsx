import { useEffect, useState } from 'react';
import {
  Typography
} from '@material-ui/core';

import Page from '../../../components/Page';
import SurveyCard from '../../../components/survey/SurveyCard';
import { ISurvey } from '../../../../../@types/survey';
import { makeBackendRequest } from '../../../utils/backendRequestHelpers';
import { useAuth0 } from '@auth0/auth0-react';


const SurveysList = () => {
  const {getIdTokenClaims} = useAuth0();

  const [surveys, setSurveys] = useState<ISurvey[]>([]);

  useEffect(() => {

    const getSurveys = async () => {
      const idTokenClaims = await getIdTokenClaims();
      const token = idTokenClaims.__raw;
      const data = await makeBackendRequest('GET', 'surveys', token);
      setSurveys(data);
    }
    getSurveys();
  },[getIdTokenClaims]);


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

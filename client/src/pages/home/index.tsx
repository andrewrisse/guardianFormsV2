import React from 'react';
import AppAppBar from '../../components/AppAppBar';
import ProductHero from '../../components/landing/ProductHero';
import Copyright from '../../components/Copyright';
import Page from '../../components/Page';


const Home = () => {
  return (
    <Page title="Home | GuardianForms">
        <AppAppBar />
        <ProductHero />
        <Copyright />
    </Page>
  );
};


export default Home;

import React from 'react';
import Box from '@material-ui/core/Box';
import AppAppBar from '../../components/AppAppBar';
import ProductHero from '../../components/landing/ProductHero';
import Copyright from '../../components/Copyright';


const Home = () => {
  return (
    <div>
      <Box>
        <AppAppBar />
        <ProductHero />

        <Copyright />
      </Box>
    </div>
  );
};


export default Home;

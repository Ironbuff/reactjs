
import React from 'react';

import { Link } from 'react-router-dom';
import Hero from '../../components/Home/Hero';
import RecentlyAdded from '../../components/Home/RecentlyAdded';

const Home = () => {
  return (
    <>
      <Hero/>
    <RecentlyAdded/>
    </>
    
  );
};

export default Home;

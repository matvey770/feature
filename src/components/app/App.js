import React from 'react';
import AppHeader from '../appHeader/AppHeader';
import MainSlider from '../mainSlider/MainSlider';
import FeatureCards from '../featureCards/FeatureCards';
import FeatureFooter from '../featureFooter/FeatureFooter';



const App = () => {
  return (
    <div className='app'>    
      <AppHeader/>
      <MainSlider/>
      <FeatureCards/>
      <FeatureFooter/>
    </div>
  )
}

export default App;

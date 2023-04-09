import React from 'react';
import FeatureHeader from '../featureHeader/FeatureHeader';
import MainSlider from '../mainSlider/MainSlider';
import FeatureCards from '../featureCards/FeatureCards';
import FeatureFooter from '../featureFooter/FeatureFooter';

import { products } from '../data/products';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './App.scss'

const App = () => {
  return (
    <div className='app'>    
      <FeatureHeader/>
      <MainSlider/>
          <Container className='app_products'>
            <Row xs={2} md={4} className='app_products-row'>
                <FeatureCards className='app_products-row_item' product={products[0]}/>
                <FeatureCards className='app_products-row_item' product={products[1]}/>
                <FeatureCards className='app_products-row_item' product={products[2]}/>
                <FeatureCards className='app_products-row_item' product={products[3]}/>
            </Row>
          </Container>
      <FeatureFooter/>
    </div>
  )
}

export default App;

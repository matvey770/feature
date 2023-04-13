import React from 'react';

import MainSlider from '../mainSlider/MainSlider';
import FeatureCards from '../featureCards/FeatureCards';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { products } from '../data/products';

const FeatureMainPage = ({onAdd}) => {
    return (
        <>
            <MainSlider/>
            <Container className='app_products'>
                <Row xs={2} md={4} className='app_products-row'>
                    <FeatureCards onAdd={onAdd} className='app_products-row_item' product={products[0]}/>
                    <FeatureCards onAdd={onAdd} className='app_products-row_item' product={products[1]}/>
                    <FeatureCards onAdd={onAdd} className='app_products-row_item' product={products[2]}/>
                    <FeatureCards onAdd={onAdd} className='app_products-row_item' product={products[3]}/>
                </Row>
            </Container>
        </>
    )
}

export default FeatureMainPage
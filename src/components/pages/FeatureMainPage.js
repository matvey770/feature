import {React, useEffect, useState} from 'react';

import MainSlider from '../mainSlider/MainSlider';
import FeatureCards from '../featureCards/FeatureCards';

import Spinner from '../spinner/Spinner';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { useHttp } from '../hooks/http.hook';

const FeatureMainPage = ({onAdd}) => {

    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => { //СДЕЛАТЬ ЧЕРЕЗ HTTP.HOOK
            setStatus('fetching');
            const response = await fetch(`http://localhost:3001/products`);
            const data = await response.json();
            setData(data);
            setStatus('fetched');
        };
    
        fetchData();
    }, [])

    if (status === 'fetched') {
        return (
            <>
                <MainSlider/>
                <Container className='app_products'>
                    <Row xs={2} md={4} className='app_products-row'>
                        <FeatureCards onAdd={onAdd} className='app_products-row_item' product={data[0]}/>
                        <FeatureCards onAdd={onAdd} className='app_products-row_item' product={data[1]}/>
                        <FeatureCards onAdd={onAdd} className='app_products-row_item' product={data[2]}/>
                        <FeatureCards onAdd={onAdd} className='app_products-row_item' product={data[3]}/>
                    </Row>
                </Container>
            </>
        )
    } else if (status === 'fetching') {
        return (
            <Spinner/>
        )
    }

}

export default FeatureMainPage
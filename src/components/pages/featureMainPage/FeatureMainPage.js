import {React, useEffect, useState} from 'react';

import MainSlider from '../../mainSlider/MainSlider';
import FeatureCards from '../../featureCards/FeatureCards';

import Spinner from '../../spinner/Spinner';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import './featureMainPage.scss'

const FeatureMainPage = ({onAdd}) => {

    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        const fetchData = async () => { //СДЕЛАТЬ ЧЕРЕЗ HTTP.HOOK
            setStatus('fetching')
            const response = await fetch(`https://6447fe3f7bb84f5a3e4f662e.mockapi.io/products`)
            const data = await response.json()
            setData(data)
            setStatus('fetched')
            setAnimate(true)
        };
    
        fetchData();
    }, [])

    if (status === 'fetched') {
        return (
            <>
                <div className='animate'>
                    <MainSlider/>
                    <Container className='app_products'>
                        <Row xs={2} md={1} className='app_products-row'>
                            <FeatureCards onAdd={onAdd} className='app_products-row_item' product={data[0]}/>
                            <FeatureCards onAdd={onAdd} className='app_products-row_item' product={data[1]}/>
                            <FeatureCards onAdd={onAdd} className='app_products-row_item' product={data[2]}/>
                            <FeatureCards onAdd={onAdd} className='app_products-row_item' product={data[3]}/>
                        </Row>
                    </Container>
                </div>
            </>
        )
    } else if (status === 'fetching') {
        return (
            <Spinner/>
        )
    }

}

export default FeatureMainPage
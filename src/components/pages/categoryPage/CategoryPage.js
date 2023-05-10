import {React, useState, useEffect} from "react";

import FeatureCards from '../../featureCards/FeatureCards';
import FeatureFooter from "../../featureFooter/FeatureFooter";
import FeatureHeader from "../../featureHeader/FeatureHeader";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import './categoryPage.scss'


const CategoryPage = ({cart, onAdd, dataType}) => {

    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => { //СДЕЛАТЬ ЧЕРЕЗ HTTP.HOOK
            setStatus('fetching')
            const response = await fetch(`https://6447fe3f7bb84f5a3e4f662e.mockapi.io/products`)
            const data = await response.json()
            setData(data)
            setStatus('fetched')
        };
    
        fetchData();
    }, [])

    const items = data.filter(item => item.category === dataType).map((item, i) => {
        return (
            <>
                <FeatureCards onAdd={onAdd} product={item}/>
            </>
        )
    })

    if (status === 'fetched') {
        return (
            <>
                <FeatureHeader cart={cart}/>
                <Container className='category_wrapper'>
                    <Row xs={2} md={1} className='category_row'>
                        {items}
                    </Row>
                </Container>
                <FeatureFooter/>
            </>

        )
    }
}

export default CategoryPage
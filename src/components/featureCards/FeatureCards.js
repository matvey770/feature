import {React, useState} from 'react'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { CSSTransition } from 'react-transition-group';

import './featureCards.scss'

const FeatureCards = ({product}) => {

    const [activeSize, setActiveSize] = useState(false)

    const CardsContainer = ({product}) => {
        const items = product.size.map((item) => {
            return (
                <button key={item} className='cards_container-sizebutton'>{item}</button>
            )
        })

        return (
            <div className='cards_container'>
                {items}
            </div>
        )
    }

    return (
        <Card key={product.id} className='cards'>
            <Card.Img variant="top" src={product.img} className="cards_img"/>
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                        {product.descr}
                    </Card.Text>
                <div className='cards_footer'>
                    <Button onClick={() => {
                                setActiveSize(!activeSize)}}
                            className='cards_footer-button' 
                            variant='dark'>В корзину
                    </Button>
                    <CSSTransition in={activeSize} timeout={300} classNames='cards_container'>
                        <CardsContainer product={product}/>
                    </CSSTransition>
                        {!activeSize && <div className='cards_footer-price'>{product.price} руб.</div>}
                </div>
            </Card.Body>
        </Card>
    );
}

export default FeatureCards;

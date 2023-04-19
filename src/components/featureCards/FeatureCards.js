import {React, useState} from 'react'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { CSSTransition } from 'react-transition-group';

import './featureCards.scss'

const FeatureCards = ({product, onAdd}) => {

    const [activeSize, setActiveSize] = useState(false)

    const CardsContainer = ({product}) => {
        const items = product.size.map((item) => {
            return (
                <button onClick={() => {onAdd(product.id, product.title, product.img, product.descr, product.price, item)}} 
                        key={item} 
                        className='cards_container-sizebutton'>
                            {item}
                </button>
            )
        })

        return (
            <div className='cards_container'>
                {items}
            </div>
        )
    }

    const onActiveSize = () => {
        setActiveSize(!activeSize)
        console.log(activeSize)
    }

    return (
        <Card key={product.id} className='cards'>
            <Card.Img variant="top" src={product.img} className="cards_img"/>
            <Card.Body>
                <Card.Title className='text'>{product.title}</Card.Title>
                    <Card.Text>
                        {product.descr}
                    </Card.Text>
                <div className='cards_footer'>
                    <Button onClick={() => {
                                onActiveSize()}}
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

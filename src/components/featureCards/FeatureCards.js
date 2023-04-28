import {React, useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { CSSTransition } from 'react-transition-group';

import './featureCards.scss'

const FeatureCards = ({product, onAdd}) => {

    const [activeSize, setActiveSize] = useState(false)
    const [activeAdd, setActiveAdd] = useState(false);

    useEffect(() => { //таймер "товар добавлен в корзину"
        if (activeAdd) {
          setTimeout(() => {
            setActiveAdd(false)
            console.log(activeAdd)
          }, 3000)
        }
      }, [activeAdd])

    const CardsContainer = ({product}) => {

        const addItem = (id, title, img, descr, price, item) => {
            onAdd(id, title, img, descr, price, item)
            onActiveSize()
            setActiveAdd(true)
        }

        const items = product.size.map((item) => {
            return (
                <button onClick={() => {addItem(product.id, product.title, product.img, product.descr, product.price, item)}} 
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

    let buttonContent = 'В корзину'
    if (activeAdd) {
        buttonContent = <>&#10003;</>
    }

    return (
        <Card key={product.id} className='cards'>
            <Link to={`/products/${product.id}`}>
                <Card.Img variant="top" src={product.img[0]} className="cards_img"/>
            </Link>
            <Card.Body className='cards_body'>
                <Card.Title className='text'>{product.title}</Card.Title>
                    <Card.Text className='cards_descr'>
                        {product.descr}
                    </Card.Text>
                <div className='cards_footer'>
                    <Button onClick={() => {
                                onActiveSize()}}
                            className={`cards_footer-button ${activeAdd ? 'cardsbutton-added' : ''}`}
                            variant='dark'>{buttonContent}
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

// &#10003;
import { products } from '../data/products';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './featureCards.scss'

const FeatureCards = () => {
        return (
            <Container>
                <Row xs={2} md={4} className="g-4">
                {products.map(item => (
                    <Col>
                        <Card className='cards_wrapper'>
                            <Card.Img variant="top" src={item.img} className="cards_img"/>
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>
                                        {item.descr}
                                    </Card.Text>
                                <div className='cards_footer'>
                                    <Button variant='dark'>В корзину</Button>
                                    <div className='cards_price'>{item.price} руб.</div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                </Row>
            </Container>
          );
}
    

export default FeatureCards;
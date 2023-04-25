import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './featureFooter.scss'

const FeatureFooter = () => {
    return (
        <Container className='footer'>
        <Row>
            <Col>
                <h2 className="footer_name">FEATURE</h2>
                <h3 className='footer_number'>8 (906) 066 15 55</h3>
            </Col>
            <Col>
                <div className='footer_menu'>
                    <div className='footer_menu-item'><a href="#">О магазине</a></div>
                    <div className='footer_menu-item'><a href="#">Доставка и оплата</a></div>
                    <div className='footer_menu-item'><a href="#">Возврат</a></div>
                    <div className='footer_menu-item'><a href="#">Контакты</a></div>
                    <div className='footer_menu-item'><a href="#">Политика конфиденциальности</a></div>
                </div>
            </Col>
        </Row>
      </Container>
        
    )
}

export default FeatureFooter;
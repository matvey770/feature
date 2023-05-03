import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {NavLink} from 'react-router-dom';

import './featureFooter.scss'

const FeatureFooter = () => {
    return (
        <Container className='footer'>
        <Row>
            <Col>
                <NavLink
                    className={'link'}
                    end
                    to="/">
                    <h2 className="footer_name">FEATURE</h2>
                </NavLink>
                <h3 className='footer_number'>8 (906) 066 15 55</h3>
            </Col>
            <Col>
                <div className='footer_menu'>
                    <NavLink
                            className={'link'}
                            end
                            to="/about">
                        <div className='footer_menu-item'>О магазине</div>
                    </NavLink>
                    <NavLink
                            className={'link'}
                            end
                            to="/about">
                        <div className='footer_menu-item'>Доставка и оплата</div>
                    </NavLink>
                    <NavLink
                            className={'link'}
                            end
                            to="/about">
                        <div className='footer_menu-item'>Возврат</div>
                    </NavLink>
                    <NavLink
                            className={'link'}
                            end
                            to="/about">
                        <div className='footer_menu-item'>Контакты</div>
                    </NavLink>
                    <NavLink
                            className={'link'}
                            end
                            to="/about">
                        <div className='footer_menu-item'>Политика конфиденциальности</div>
                    </NavLink>
                </div>
            </Col>
        </Row>
      </Container>
    )
}

export default FeatureFooter;
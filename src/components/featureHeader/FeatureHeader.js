import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {Link, NavLink} from 'react-router-dom';

import shoppingCart from '../../img/icons/shopping-cart.png'

import './featureHeader.scss'

const FeatureHeader = ({cart}) => {

  let count
  let countVar = 'hidden'
  if (cart) {
    if (cart.length > 0) {
      count = cart.length
      countVar = 'visible'
    } else {
      countVar = 'hidden'
      count = null
    }
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
      <NavLink
              className={'link'}
              end
              to="/">
            <div className='appheader_logo'>FEATURE</div>
      </NavLink>
      <NavLink
              className={'link_cartmobile'}
              end
              to="/cart">
              <div className='link_wrapper'>
                <img className='link_cart-icon' src={shoppingCart} alt="cart"></img> 
                <div className='link_counter' style={{'visibility' : countVar}}>{count}</div>
              </div>
      </NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '200px' }}
            navbarScroll
          >
            <NavLink
              className={'link'}
              end
              to="/new">
                Новинки
              </NavLink>
            <NavDropdown title="Коллекция" id="navbarScrollingDropdown">
              <NavDropdown.Item>
                <NavLink
                  className={'link'}
                  end
                  to="/t-shirts">
                  Футболки
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink
                    className={'link'}
                    end
                    to="/hoodies">
                    Худи
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>
            <NavLink
              className={'link_cart'}
              end
              to="/cart">
              <div className='link_wrapper'>Корзина 
                <div className='link_counter' style={{'visibility' : countVar}}>{count}</div>
              </div>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default FeatureHeader;
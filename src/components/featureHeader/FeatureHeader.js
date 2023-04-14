import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {Link, NavLink} from 'react-router-dom';

import './featureHeader.scss'
import logo from "../../img/feature.jpg"

const FeatureHeader = ({count}) => {

  let countVar = 'hidden'
  if (count.length > 0) {
    countVar = 'visible'
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
      <NavLink
              className={'link'}
              end
              to="/">
            <img src={logo} alt="logo" className='appheader_logo'/></NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action2">Новинки</Nav.Link>
            <NavDropdown title="Коллекция" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Футболки</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Худи
              </NavDropdown.Item>
            </NavDropdown>
            <NavLink
              className={'link_cart'}
              end
              to="/cart">
              <div className='link_wrapper'>Корзина 
                <div className='link_counter' style={{'visibility' : countVar}}>{count.length}</div>
              </div>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default FeatureHeader;
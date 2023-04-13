import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {Link, NavLink} from 'react-router-dom';

import './featureHeader.scss'
import logo from "../../img/feature.jpg"

const FeatureHeader = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <img src={logo} alt="logo" className='appheader_logo'/>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavLink
              className={'link'}
              end
              to="/">
            Главная</NavLink>
            <Nav.Link href="#action2">Новинки</Nav.Link>
            <NavDropdown title="Коллекция" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Футболки</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Худи
              </NavDropdown.Item>
            </NavDropdown>
            <NavLink
              className={'link'}
              end
              to="/cart">
            Корзина</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default FeatureHeader;
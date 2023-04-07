import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css'

const AppHeader = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Feature</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Главная</Nav.Link>
            <Nav.Link href="#action2">Новинки</Nav.Link>
            <NavDropdown title="Коллекция" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Футболки</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Худи
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#">
              Корзина
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppHeader;
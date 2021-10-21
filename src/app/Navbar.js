import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarRB from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <NavbarRB bg="dark" variant="dark">
      <Container fluid>
      <NavbarRB.Brand as={NavLink} to="/comics">
        Marvel App
      </NavbarRB.Brand>
      <Nav className="me-auto">
        <Nav.Link as={NavLink} to="/comics">
          Comics
        </Nav.Link>
      </Nav>
      </Container>
    </NavbarRB>
  );
};

export default Navbar;

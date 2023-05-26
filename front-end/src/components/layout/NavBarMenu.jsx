import { Button, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import logOut from "../../assets/logout.svg";
import { useAuth } from "../../contexts/AuthContext";

function NavBarMenu() {
  const { authState, logOutUser } = useAuth();
  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Navbar.Brand className="fw-bolder text-white">
        <img
          src={logo}
          alt="app-logo"
          width="32"
          height="32"
          className="me-2 ms-2"
        />
        Study management
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="auto">
          <Nav.Link className="fw-bolder text-white" to="/dashboard" as={Link}>
            Dashboard
          </Nav.Link>
          <Nav.Link className="fw-bolder text-white" to="/about" as={Link}>
            About
          </Nav.Link>
        </Nav>
        <Nav className="auto ms-auto">
          <Nav.Link className="fw-bolder text-white" disabled>
            {authState.user && `Welcome ${authState.user.username}`}
          </Nav.Link>
          <Button
            variant="secondary"
            className="font-wright-bolder text-white"
            onClick={logOutUser}
          >
            <img
              src={logOut}
              alt="logout"
              width="32"
              height="32"
              className="me-2"
            />
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBarMenu;
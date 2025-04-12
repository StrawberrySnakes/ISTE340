import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

// First Bootstrap element, to create topNav

const TopNav = ({ setSection }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="top-nav">
      <Navbar.Brand
        style={{
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
        onClick={() => setSection('about')}
      >
        iSchool
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link
            onClick={() => setSection('people')}
            className="nav-link"
          >
            People
          </Nav.Link>
          <Nav.Link
            onClick={() => setSection('degrees')}
            className="nav-link"
          >
            Degrees
          </Nav.Link>
          <Nav.Link
            onClick={() => setSection('minors')}
            className="nav-link"
          >
            Minors
          </Nav.Link>
          <Nav.Link
            onClick={() => setSection('employment')}
            className="nav-link"
          >
            Employment
          </Nav.Link>

          <Nav.Link
            onClick={() => setSection('resources')}
            className="nav-link"
          >
            Resources
          </Nav.Link>

        </Nav>
        {/* For mobile-- Makes Collapsable */}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopNav;

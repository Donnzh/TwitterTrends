import React from 'react';
import {
  Navbar,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';

import './Nav.scss';

export const Navigation = () => (
  <Navbar fixedTop className="navBarContainer">
    <Navbar.Header>
      <Navbar.Brand className="navBarBrand" >
        <a href="#">Twitter Trends</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse className="navBarCollapse">
      <Navbar.Form pullRight className="navBarForm">
        <FormGroup>
          <FormControl type="text" placeholder="Search" />
        </FormGroup>
        {' '}
        <Button type="submit">Submit</Button>
      </Navbar.Form>
    </Navbar.Collapse>
  </Navbar>
);

export default Navigation;

import React from 'react';

import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

class AppNavbar extends React.Component {
  state = {
      isOpen: false
  };
  
  toggle=()=> {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="success" light expand="md" className="mb-5">
          <Container>
            <NavbarBrand href="/">reactstrap</NavbarBrand>
              
            <NavbarToggler onClick={this.toggle} />
          
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav>
                <NavItem>
                  <NavLink href="https://github.com/bradtraversy/mern_shopping_list">
                    BradGithub
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://reactstrap.github.io">
                    Bootstrap
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://www.mongodb.com/">
                    MongoDB Atlas
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://dashboard.heroku.com/">
                    Heroku
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://jwt.io/">
                    JWT
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://www.getpostman.com/">
                    Postman
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
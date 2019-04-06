import React,{Component,Fragment} from 'react';

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

import {connect} from 'react-redux';  
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import Login from './auth/Login';

class AppNavbar extends Component {
  state = {
      isOpen: false
  };
  
  toggle=()=> {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const{isAuthenticated,user}=this.props.auth;

    const authLinks=(
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>
              {user ? `Welcome ${user.name}` :``}
            </strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks=(
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <Login />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="success" light expand="md" className="mb-5">
          <Container>
            <NavbarBrand href="/">reactstrap</NavbarBrand>
              
            <NavbarToggler onClick={this.toggle} />
          
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

AppNavbar.propTypes={
  auth:PropTypes.object.isRequired,
}
const mapStateToProps=(state)=>({
  auth:state.auth
 })

export default connect(mapStateToProps,null)(AppNavbar);
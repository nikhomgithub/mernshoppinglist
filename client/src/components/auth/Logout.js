import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'reactstrap';
import PropTypes from 'prop-types';
import {logout} from '../../actions/authActions';


class Logout extends Component {
  render() {
    return (
      <Fragment>
        <NavLink onClick={this.props.logout} href="#">
          Logout
        </NavLink>
      </Fragment>
    )
  }
}

Logout.propTypes={
  //isAuthenticated:PropTypes.bool,
  //error:PropTypes.object.isRequired,
  logout:PropTypes.func.isRequired,
}
const mapStateToProps=(state)=>({
 
})

export default connect(mapStateToProps,{logout})(Logout);
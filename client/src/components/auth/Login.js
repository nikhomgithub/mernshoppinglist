import React, { Component } from 'react'
import {Button,Modal,ModalHeader,ModalBody,Form,FormGroup,Label,Input,NavLink,Alert} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';

class Login extends Component {
  state={
    modal:false,//true = open modal , false = close modal
    email:'',
    password:'',
    msg:null //error message from server in case of login error 
  }

  componentDidUpdate(prevProps){ //keep checking whether error message coming or not
    const{error} = this.props;
    if(error !== prevProps.error){ //check error is valid 
      //Check for register error
      if(error.id ==='LOGIN_FAIL'){ //error from server 
        this.setState({msg:error.msg.msg}); //send error message to state
      }else{
        this.setState({msg:null}); 
      }
    }
    //To close modal if it is modal=true(opening) + login success (isAuthenticated=true) 
    if(this.state.modal){
      if(this.props.isAuthenticated){
        this.toggle(); //toggle will change modal to false (close)
      }
    }
  }
  //to change state of modal 
  toggle=()=>{
    //Clear errors
    this.props.clearErrors();
    this.setState({
      modal:!this.state.modal //change modal from true->false, false->true
    });
  }

  onChange=(e)=>{
    this.setState({[e.target.name]:e.target.value});
  }

  onBSubmit=(e)=>{
    e.preventDefault();
    const{email,password}=this.state;

    const user={
      email,password
    }
    //attemp to login
    this.props.login(user);
  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Login
        </NavLink>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle} //this "x" to close modal
        >
          <ModalHeader toggle={this.toggle}> 
            Login
          </ModalHeader>
          <ModalBody>
            {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert>:null}
            <Form>
              <FormGroup>

                <Label for="email">Email</Label>
                <Input 
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={this.onChange}
                ></Input>

                <Label for="password">Password</Label>
                <Input 
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.onChange}
                ></Input>


                <Button
                  onClick={this.onBSubmit}
                  color="dark"
                  style={{marginTop:'2rem'}}
                  block
                  
                >Login</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

Login.propTypes={
  isAuthenticated:PropTypes.bool,
  error:PropTypes.object.isRequired,
  login:PropTypes.func.isRequired,
  clearErrors:PropTypes.func.isRequired,
}
const mapStateToProps=(state)=>({
  isAuthenticated:state.auth.isAuthenticated,
  error:state.error
})

export default connect(mapStateToProps,{login,clearErrors})(Login);

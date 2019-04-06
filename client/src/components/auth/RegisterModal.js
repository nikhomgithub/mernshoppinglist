import React, { Component } from 'react'
import {Button,Modal,ModalHeader,ModalBody,Form,FormGroup,Label,Input,NavLink,Alert} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';

class RegisterModal extends Component {
  state={
    modal:false,
    name:'',  
    email:'',
    password:'',
    msg:null
  }

  componentDidUpdate(prevProps){
    const{error} = this.props;
    if(error !== prevProps.error){
      //Check for register error
      if(error.id ==='REGISTER_FAIL'){
        this.setState({msg:error.msg.msg});
      }else{
        this.setState({msg:null});
      }
    }

    if(this.state.modal){
      if(this.props.isAuthenticated){
        this.toggle();
      }
    }
  }

  toggle=()=>{
    //Clear errors
    this.props.clearErrors();
    this.setState({
      modal:!this.state.modal
    });
  }

  onChange=(e)=>{
    this.setState({[e.target.name]:e.target.value});
  }

  onBSubmit=(e)=>{
    e.preventDefault();
    const {name,email,password} = this.state;
    //Create user object
    const newUser={
      name,
      email,
      password
    };

    //Attemp to register
    this.props.register(newUser);


  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}> 
            Register
          </ModalHeader>
          <ModalBody>
            {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert>:null}
            <Form>
              <FormGroup  >
                <Label for="name">Name</Label>
                <Input 
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="mb-3"
                  onChange={this.onChange}
                ></Input>

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
                  
                >Register</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

RegisterModal.propTypes={
  isAuthenticated:PropTypes.bool,
  error:PropTypes.object.isRequired,
  register:PropTypes.func.isRequired,
  clearErrors:PropTypes.func.isRequired,
}
const mapStateToProps=(state)=>({
  isAuthenticated:state.auth.isAuthenticated,
  error:state.error
})

export default connect(mapStateToProps,{register,clearErrors})(RegisterModal);
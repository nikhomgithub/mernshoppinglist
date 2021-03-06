import React, { Component } from 'react'
import {Button,Modal,ModalHeader,ModalBody,Form,FormGroup,Label,Input} from 'reactstrap';
import {connect} from 'react-redux';
import {addItem} from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
  state={
    modal:false,
    name:''  
  }

  toggle=()=>{
    this.setState({
      modal:!this.state.modal
    });
  }

  onChange=(e)=>{
    this.setState({[e.target.name]:e.target.value});
  }

  onBSubmit=(e)=>{
    e.preventDefault();
    const newItem={
      name:this.state.name
    }
    //Add item via addItem action
    this.props.addItem(newItem);
    this.toggle();
  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? 
          <Button
          color="dark"
          style={{marginBottom:'2rem'}}
          onClick={this.toggle}
          >Add Item</Button>
          :
          <h4 className="mb-3 ml-4">Please Log in to manage items</h4>
      
        }

        
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}> 
            Add To Shopping List
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup  >
                <Label>Item</Label>
                <Input 
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add shopping item"
                  onChange={this.onChange}
                ></Input>
                <Button
                  onClick={this.onBSubmit}
                  color="dark"
                  style={{marginTop:'2rem'}}
                  block
                  
                >Add</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

ItemModal.propTypes={
  isAuthenticated:PropTypes.bool,
}

const mapStateToProps=(state)=>({
  isAuthenticated:state.auth.isAuthenticated,
  item:state.item
})

export default connect(mapStateToProps,{addItem})(ItemModal);
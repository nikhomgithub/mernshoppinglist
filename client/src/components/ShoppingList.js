import React, { Component } from 'react'
import {Container,ListGroup,ListGroupItem,Button} from 'reactstrap';
import {connect} from 'react-redux';
import {getItems,deleteItem} from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
 
  componentDidMount(){
    this.props.getItems();
  }
  
  onDeleteClick=(id)=>{
    this.props.deleteItem(id);
  }

  render() {
    const {items}=this.props.item; 
    
    return (
      <Container>
     
        <ListGroup>
            {items.map(({_id,name})=>(
                <ListGroupItem key={_id}>

                {this.props.isAuthenticated ?
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this,_id)}
                  >&times;</Button>
                  : null}

                  {name}
                </ListGroupItem>
            ))}
        </ListGroup>
      </Container>
    )
  }
}

ShoppingList.propTypes={
  getItems:PropTypes.func.isRequired,
  deleteItem:PropTypes.func.isRequired,
  item:PropTypes.object.isRequired,
  isAuthenticated:PropTypes.bool,
}

const mapStateToProps=(state)=>({
  isAuthenticated:state.auth.isAuthenticated,
  item: state.item
})

export default connect(
  mapStateToProps,
  {getItems,deleteItem}
)(ShoppingList);
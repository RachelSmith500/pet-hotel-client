import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class ManageOwners extends Component {
  
    state = {
        name: ''
    }

    componentDidMount = () => {
        this.props.dispatch({
            type: 'FETCH_PET_OWNER'
        })
        this.props.dispatch({
            type: 'FETCH_ PET'
        })
    }

    handleChangeName = (event) =>{
        this.setState({
            name: event.target.value
        })
    }

    handleSubmit = () => {
        this.props.dispatch({type: 'ADD_PET_OWNER', payload: this.state})
        this.setState({
            name: ''
        })
    
    }
    render() {
        return (
            <div>
                <div>Add Pet Owner</div>
                <input value={this.state.name} onChange={this.handleChangeName}/>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}
const mapStateToProps = (reduxState) => {
    return {
      reduxState
    }
  }

export default connect(mapStoreToProps)(ManageOwners);
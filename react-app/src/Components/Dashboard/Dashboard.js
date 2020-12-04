import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import ManagePets from '../ManagePets/ManagePets';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class Dashboard extends Component {
    state = {
        pet: '',
        breed: '',
        color: '',
        owner: '',
        checked: 'in'
      }
    
    componentDidMount = () => {
        this.props.dispatch({
            type: 'FETCH_PET_OWNER'
        })
        this.props.dispatch({
            type: 'FETCH_ PETS'
        })
    }

    handleInput = (inputName) => (event) => {
        console.log(`in handlePetInput ${inputName}`);
    
        this.setState({
          ...this.state,
          [inputName]: event.target.value,
        })
      }
    
      handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(
          {
            type: 'ADD_PET',
            payload: this.state
          })
      }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                </form>
            </div>
        );
    }   
}

const mapStateToProps = (reduxState) => {
    return {
      reduxState
    }
  }
export default connect(mapStoreToProps)(Dashboard);
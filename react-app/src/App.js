import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import ManageOwners from './ManageOwners/ManageOwners';

import './App.css';

class App extends Component {

  
  render() {
    return (
      <Router>
        <div className="App">

          <Route exact path="/" component={Dashboard} />
          <Route exact path="/owners" component={ManageOwners} />
          
        </div>
      </Router>
    );
  }
}

export default App;

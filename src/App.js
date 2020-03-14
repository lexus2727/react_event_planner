import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

import Header from './components/Header'
import Home from './containers/Home'
import Events from './containers/Events'
import Planner from './containers/Planner'
import EventUpdate from './containers/EventUpdate'
import Footer from './components/Footer'


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/events" component={Events}/>
          <Route path="/party-planner/:id" component={Planner}/>
          <Route path="/events/:id/edit" component={EventUpdate}/>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;

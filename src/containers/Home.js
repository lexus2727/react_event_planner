import React, { Component } from 'react';
import { countdown } from '../actions/actions'

import About from '../components/About';
import WhatToDo from '../components/WhatToDo';
import EventForm from './EventForm';

class Home extends Component {
  
  state = {
    countdown: ""
  }

  deadlineSample = () => {
    let today = new Date()
    let inTwoDays = new Date()
    this.deadline = inTwoDays.setDate(today.getDate()+2)
  }

  componentDidMount() {
    this.deadlineSample()
    this.interval = setInterval(this.timerCountdown, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  timerCountdown = () => { 
    this.setState({
        countdown: countdown(this.deadline)
    })
      
  }

  render() {

    return (
      <div className="Home">
        <About />
        <WhatToDo countdown={this.state.countdown} />
        <EventForm />
      </div>
    )
  }
}


export default Home
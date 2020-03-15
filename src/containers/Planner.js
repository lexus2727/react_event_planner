import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchEvents } from '../actions/actions'
import { NavLink } from 'react-router-dom'

import TaskForm from './TaskForm';
import Event from './Event'
import Tasks from './Tasks';

class Planner extends Component {

  componentDidMount() {
    if (this.props.events.length === 0) this.props.dispatch(fetchEvents())
  }

  render() {

    if (this.props.events.length === 0 || this.props.loading === true) {
      return (
        <div className="row">
          <section>
            <div className="loader"></div>
          </section>
        </div>
      )    
    } else {
      const event = this.props.events.find(event => event.id === parseInt(this.props.match.params.id, 10))

      if (event === undefined) {
        return (
          <div className="row">
            <section>
              <h4>This event has been removed. Return to <NavLink to="/events">Events</NavLink></h4>
            </section>
          </div>
        )    
      } 
      else if (new Date(event.deadline) <= new Date()) {
        return (
          <div id="planner">
            <Event show={true} event={event} />
            <Tasks event_tasks={event.tasks} event={event} />
          </div>
        )
      } 
      else {
  
        return (
          <div id="planner">
            <Event show={true} event={event} />
            <TaskForm event={event} dispatch={this.props.dispatch} />
            <Tasks event_tasks={event.tasks} event={event} />
          </div>
        )
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    events: state.eventsState.events,
    loading: state.eventsState.loading
  }
}


export default connect(mapStateToProps)(Planner);
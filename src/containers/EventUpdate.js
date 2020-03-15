import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateEvent } from '../actions/actions'
import { NavLink } from 'react-router-dom'

class EventUpdate extends Component {
    
    state = {
        id: "",
        deadline: "", 
        title: "",
        description: ""
    }

    componentDidMount() {
        this.initialState()
    }

    initialState = () => {
        if (this.props.events.length !== 0) {
            let event = this.props.events.find(event => event.id === parseInt(this.props.match.params.id, 10))
            this.setState({
                id: event.id,
                deadline: event.deadline.split('.')[0],
                title: event.title,
                description: event.description
            })
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
      }
    
    handleSubmit = event => {
        event.preventDefault()
        let emptyValues = Object.keys(this.state).some(value => this.state[value] === "")

        if (emptyValues) {
            alert("Please fill out deadline and title.")
        } else {
            updateEvent(this.state)
            this.setState({deadline: "", title: "", description: ""})
        }
    } 

    render() {

        if (this.props.events.length === 0) {
            return (
              <div className="row">
                <section>
                  <h4>Please return to the <NavLink to="/events">Event</NavLink> you'd like to Edit and try again.</h4>
                </section>
              </div>
            )    
        } else {
            const {deadline, title, description} = this.state
            return (
                <div className="row fullForm tealRow" id="formRow">
                    <section>
                        <h2>Update Event</h2>
                        <form onSubmit={this.handleSubmit}>
                        <p>
                            <label>Deadline</label>
                            <input type="datetime-local" name="deadline" value={deadline} onChange={this.handleChange} />
                        </p><br />
                        <p>
                            <label for="title">Title</label>
                            <input type="text" name="title" value={title} onChange={this.handleChange} />
                        </p><br />
                        <p>
                            <label for="description">Description</label>
                            <textarea name="description" value={description} onChange={this.handleChange} rows="4" cols="50"></textarea>
                        </p><br />                        
                        <input type="submit" value="Submit" />
                        </form>
                    </section>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
      events: state.eventsState.events
    }
  }

  export default connect(mapStateToProps)(EventUpdate);
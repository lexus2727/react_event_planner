import React, { Component   } from 'react'
import { createEvent } from '../actions/actions'

export default class EventForm extends Component {
    
    slide = 1
    
    state = {
        deadline: "",
        title: "",
        description: ""
    }
 
    handleKeyPress = event => {
        if (event.key === 'Enter') {
            ++this.slide
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
            createEvent(this.state)   
        }

        this.slide = 1
        this.setState({deadline: "", title: "", description: ""})
    } 

    render() {

        function renderForm() {
            const {deadline, title, description} = this.state

            if (this.slide === 1) { 
                return (
                    <div className="formFragment">
                        <h2>Make a Deadline</h2>
                        <input type="datetime-local" name="deadline" value={deadline} onKeyPress={this.handleKeyPress} onChange={this.handleChange} />
                         </div>
                )
          
            } else if (this.slide === 2) {
                return (
                    <div className="formFragment">
                        <h2>Create an Event Title</h2>
                        <input type="text" name="title" value={title} onKeyPress={this.handleKeyPress} onChange={this.handleChange} />       
                    </div>
                )

            } else if (this.slide === 3) {
                return (
                    <div className="formFragment">
                        <h2>Describe the Occasion</h2>
                        <textarea name="description" value={description} onKeyPress={this.handleKeyPress} onChange={this.handleChange} rows="6" cols="50"></textarea>       
                    </div>
                )
            
            } else if (this.slide === 4) {
                return (
                    <div className="fullForm">
                        <h2>Is This Your Event?</h2>
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
                    </div>
                )
            }
        }

        return (
            <div className="row tealRow" id="plan">
              <section>
                {renderForm.call(this)}
              </section>
            </div>
        )
    }

    
}
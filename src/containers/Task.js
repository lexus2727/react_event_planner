import React, { Component } from 'react'
import { countdown } from '../actions/actions'
import { updateTaskStatus } from '../actions/actions'
import { deleteTask } from '../actions/actions'

export default class Task extends Component {

    state = {
        countdown: ""
    }

    deadlineString = new Date(this.props.task.deadline.split('.')[0]).toLocaleString()

    componentDidMount() {
        this.interval = setInterval(this.countdownTimer, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    passedDeadline = datetime => new Date(datetime) <= new Date() ? true : false

    countdownTimer = () => {
        this.setState({
            countdown: countdown(this.props.task.deadline.split('.')[0])
        })
    }

    handleCheck = () => {
        let taskCopy = {...this.props.task}
        taskCopy.completed = true
        this.props.dispatch(updateTaskStatus(taskCopy))
    }

    handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            this.props.dispatch(deleteTask(this.props.task.id))
        }
    }


  render() {

    function renderButtons() {
        if (this.passedDeadline(this.props.event.deadline.split('.')[0]) === false) {
            return (
                <React.Fragment>
                    <button onClick={this.handleCheck}>Check</button>
                    <button onClick={this.handleDelete}>Delete</button>
                </React.Fragment>
            )
        } 
    }

    function renderCompletionStatus() {
        if (this.props.task.completed) {
            return (
                <React.Fragment>
                    <h1 className="completed">Completed</h1>
                    <h3>{this.deadlineString}</h3>        
                    <p>{this.props.task.description}</p>
                </React.Fragment>
            )
        } else if (this.passedDeadline(this.props.task.deadline.split('.')[0]) && this.props.task.completed === false) {
            return (
                <React.Fragment>
                    <h1 className="incompleted">Incomplete!</h1>
                    <h3>Late by {this.state.countdown}</h3>
                    <p>{this.props.task.description}</p>
                    {renderButtons.call(this)}
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <h1>{this.state.countdown}</h1>
                    <h3>{this.deadlineString}</h3>        
                    <p>{this.props.task.description}</p>
                    {renderButtons.call(this)}
                </React.Fragment>
            )        
        }
    }
    
    return (
        <div className="container">
            {renderCompletionStatus.call(this)}
        </div>
    )
  }
}
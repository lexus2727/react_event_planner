import React, { Component } from 'react';
import { connect } from 'react-redux'
import Task from './Task';

class Tasks extends Component {

    componentDidMount() {
      this.props.dispatch({type: "ADD_TASKS", tasks: this.props.event_tasks})
    }
  
    render() {
        if (this.props.loading === true) {
            return (
              <div className="row">
                <section>
                  <div className="loader"></div>
                </section>
              </div>
            )
        } else {
            return (
                <div className="list">
                    <h2>Tasks</h2>
                    <section className="flexJustify">
                        {this.props.tasks.map(task => <Task key={task.id} task={task} event={this.props.event} dispatch={this.props.dispatch} />)}
                    </section>
                </div>
            )
        }
  
    }
}
  
const mapStateToProps = state => {
    return {
        tasks: state.tasksState.tasks,
        loading: state.tasksState.loading
    }
}

export default connect(mapStateToProps)(Tasks)
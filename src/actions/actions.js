import fetch from 'isomorphic-fetch'

export function countdown(event_deadline) {
    let now = new Date().getTime()
    let deadline = new Date(event_deadline).getTime()
    let distance = deadline > now ? deadline - now : now - deadline
    
    let days = Math.floor(distance / (1000 * 60 * 60 * 24))
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((distance % (1000 * 60)) / 1000)
    
    let countdown = days + "d " + hours + "h " + minutes + "m " + seconds + "s "
    return countdown
}

export function createEvent(data) {
    return fetch('/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(resp => resp.json())
    .then(event => alert(`${event.title} has been created!`))
}

export function createTask(data) {
    return (dispatch) => {
        dispatch({ type: 'LOAD_TASK_REQUEST' }) 
        return fetch(`/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)})
        .then(resp => resp.json())
        .then(task => dispatch({type: "ADD_TASK", task: task}))
        .catch(error => console.log(error))
    }
}

export function fetchEvents() {
    return (dispatch) => {
        dispatch({ type: 'LOAD_EVENT_REQUEST' })
        return fetch('/events')
        .then(resp => resp.json())
        .then(events => dispatch({type: "ADD_EVENTS", payload: events}))
        .catch(error => console.log(error))
    }
}

// export function fetchEventShow(id) {
//     debugger
//     return (dispatch) => {
//         dispatch({ type: 'LOAD_EVENT_REQUEST' })
//         return fetch(`/events/${id}`, {cache: "no-store"})
//         .then(resp => {
//             debugger
//             return resp.json()})
//         .then(event => {
//             debugger
//             dispatch({ type: 'STOP_LOAD_REQUEST' })
//             return event})
//         .catch(error => console.log(error))
//         }
// }

export function updateEvent(data) {
    return fetch(`/events/${data.id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(event => alert(`${event.title} has been updated!`))
    .catch(error => console.log(error))
}

export function updateTaskStatus(data) {
    return (dispatch) => {
        dispatch({ type: 'LOAD_TASK_REQUEST' }) 
        return fetch(`/tasks/${data.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(task => dispatch({type: "UPDATE_TASK", task: task}))
        .catch(error => console.log(error))
    }
}

export function deleteEvent(id) {
    return (dispatch) => {
        dispatch({ type: 'LOAD_EVENT_REQUEST' }) 
        return fetch(`/events/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            },
        })
        .then(resp => resp.json())
        .then(event => dispatch({type: "DELETE_EVENT", id: event.id}))
        .catch(error => console.log(error))
    }
}

export function deleteTask(id) {
    return (dispatch) => {
        dispatch({ type: 'LOAD_TASK_REQUEST' }) 
        return fetch(`/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            },
        })
        .then(resp => resp.json())
        .then(task => dispatch({type: "DELETE_TASK", id: task.id}))
        .catch(error => console.log(error))
    }
}
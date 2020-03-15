//import fetch from 'isomorphic-fetch'

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

export async function createEvent(data) {
    const resp = await fetch('http://localhost:3001/api/v1/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const event = await resp.json()
    return alert(`${event.title} has been created!`)
}

export function createTask(data) {
    return async (dispatch) => {
        dispatch({ type: 'LOAD_TASK_REQUEST' }) 
        try {
            const resp = await fetch(`http://localhost:3001/api/v1/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const task = await resp.json()
            return dispatch({ type: "ADD_TASK", task: task })
        }
        catch (error) {
            return console.log(error)
        }
    }
}

export function fetchEvents() {
    return async (dispatch) => {
        dispatch({ type: 'LOAD_EVENT_REQUEST' })
        try {
            const resp = await fetch('http://localhost:3001/api/v1/events')
            const events = await resp.json()
            return dispatch({ type: "ADD_EVENTS", payload: events })
        }
        catch (error) {
            return console.log(error)
        }
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
    return fetch(`http://localhost:3001/api/v1/events/${data.id}`, {
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
        return fetch(`http://localhost:3001/api/v1/tasks/${data.id}`, {
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
    return async (dispatch) => {
        dispatch({ type: 'LOAD_EVENT_REQUEST' }) 
        try {
            const resp = await fetch(`http://localhost:3001/api/v1/events/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            })
            const event = await resp.json()
            return dispatch({ type: "DELETE_EVENT", id: event.id })
        }
        catch (error) {
            return console.log(error)
        }
    }
}

export function deleteTask(id) {
    return async (dispatch) => {
        dispatch({ type: 'LOAD_TASK_REQUEST' }) 
        try {
            const resp = await fetch(`http://localhost:3001/api/v1/taskss/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            })
            const task = await resp.json()
            return dispatch({ type: "DELETE_TASK", id: task.id })
        }
        catch (error) {
            return console.log(error)
        }
    }
}
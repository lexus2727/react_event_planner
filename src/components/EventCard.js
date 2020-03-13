import React from 'react'
import { NavLink } from 'react-router-dom'

const EventCard = ({event, countdown, deadline, prepared, handleDelete}) => {

    return (
        <div className="container">
            {prepared === null ? <h1>{countdown}</h1> : <h1>{prepared}</h1>}
            <h3><NavLink to={`/party-planner/${event.id}`}>{event.title}</NavLink></h3>
            <h3>{deadline}</h3>        
            <p>{event.description}</p>
            {prepared === null ? <NavLink className="button" to={`/events/${event.id}/edit`}>Edit</NavLink> : null}
            <a className="button" onClick={handleDelete}>Delete</a>
        </div>
    )
}

export default EventCard
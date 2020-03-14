import React from 'react'
import { NavLink } from 'react-router-dom'

const EventShow = ({event, countdown, deadline, prepared, handleDelete}) => {
    return (
        <div className="row orangeRow" id="eventShow">
          <section id="plan">
            <h1>{event.title}</h1>
            {prepared === null ? <h3 className="darkBlue">{countdown}</h3> : <h3 className="darkBlue">{prepared}</h3>}
            <h3>{deadline}</h3>        
            <p>{event.description}</p>
            {prepared === null ? <NavLink className="button" to={`/events/${event.id}/edit`}>Edit</NavLink> : null}
            &nbsp;
            <a className="button" onClick={handleDelete}>Delete</a>
          </section>
        </div>
    )
}

export default EventShow
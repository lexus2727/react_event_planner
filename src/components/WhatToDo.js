import React from 'react'

const WhatToDo = props => {

    return (
        <div className="row orangeRow" id="howTo">
            <section>
            <h2>What To Do</h2>
            <div>
                <figure>
                    <img src="https://images.8tracks.com/cover/i/001/570/575/tumblr_mxpdc6diyr1s0rqt5o1_500-5661.gif?rect=100,0,300,300&q=98&fm=jpg&fit=max&w=320&h=320" alt="" />
                    <figcaption>Create an Event</figcaption>
                </figure>
                <figure>
                    <img src="http://c.ststat.net/content/EntImg/Artist/foo-fighters--388821086-300x300.jpg" alt="" />
                    <figcaption>Plan it Out</figcaption>
                </figure>
                <figure>
                    <span>{props.countdown}</span>
                    <figcaption>Meet the Deadline</figcaption>
                </figure>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.</p>
            </section>
        </div>
    )
}

export default WhatToDo
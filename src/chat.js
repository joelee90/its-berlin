import React, { useEffect, useRef } from 'react';
import { socket } from './socket';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Chat() {

    const chatMessages = useSelector(
        state => state && state.message
    );
    console.log("last 10 messages", chatMessages);

    const elemRef = useRef();

    useEffect(() => {
        elemRef.current.scrollTop = elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    const keyCheck = (e) => {
        if(e.key === "Enter") {
            e.preventDefault();
            socket.emit('Send chat', e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className = "chat-body">
            <img style ={{height: "15vh", width: "50vw"}} src = "/images/chat.jpg"/ >
            < br/>
            <div className="chat-container" ref = { elemRef } >
                {chatMessages && chatMessages.map(
                    val => (
                        <div className="chat-in" key={val.id}>
                            <img style ={{height: "30px"}} src = "/images/berlin.png"/ >
                            {val.firstname} {""}
                            <span className="chat-msg">{val.message}</span>
                            < br/>
                            <span className="time">{val.created_at}</span>
                        </div>
                    )
                )}
            </div>
            <textarea
                placeholder = "Add your message here"
                onKeyDown = { keyCheck }
                style ={{width: "50vw", height: "15vh"}}
                className = "textarea"
            >
            </textarea>

        </div>
    );
}

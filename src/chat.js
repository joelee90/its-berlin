import React, { useEffect, useRef } from 'react';
import { socket } from './socket';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Chat() {

    const chatMessages = useSelector(
        state => state && state.message
    );
    // console.log("last 10 messages", chatMessages);

    // const newMessage = useSelector(
    //     state => state && state.message
    // );
    // console.log("newMessages", newMessage);

    const elemRef = useRef();

    useEffect(() => {
        // console.log("chat hooks mounted");
        // console.log("elemRef", elemRef);
        // console.log("scroll top: ", elemRef.current.scrollTop);
        // console.log("scroll height: ", elemRef.current.scrollHeight);
        // console.log("client height: ", elemRef.current.clientHeight);
        elemRef.current.scrollTop = elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);
    //auto scroll down when page loads.

    const keyCheck = (e) => {
        // console.log("e.target.val", e.target.value);
        // console.log("e.key", e.key);
        if(e.key === "Enter") {
            // console.log("Enter pressed!");
            e.preventDefault();
            socket.emit('Send chat', e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className = "chat-body">
            <div className = "chat">
                <div className="chat-container" ref = { elemRef } >
                    {chatMessages && chatMessages.map(
                        val => (
                            <div className="chat-in" key={val.id}>
                                <div className="chat-person">
                                    <img src = {val.url}/>
                                    {val.firstname}
                                    < br/>
                                    <span className="time">{val.created_at}</span>
                                </div>
                                <span className="chat-msg">{val.message}</span>
                            </div>
                        )
                    )}
                </div>
                <textarea
                    placeholder = "Add your message here"
                    onKeyDown = { keyCheck }
                    style ={{width: "40vw", height: "8vh"}}
                    className = "textarea"
                >
                </textarea>
            </div>
        </div>
    );
}

// <React.Fragment>
// </React.Fragment>

//ref - manually change the DOM,

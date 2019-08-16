import React, { useState, useEffect } from 'react';
import axios from "./axios";
import Status from './status';

export default function Profile() {


    const [name, setName] = useState();

    useEffect(() => {
        console.log("profile rendering!");
        (async () => {
            const {data} = await axios.post('/checkusername');
            console.log("data checkusername", data);
            setName(data.data);
        })();


    }),[];



    return (
        <div>
            <div>
                <h1>Welcome {name}</h1>
            </div>
            <div className="profile-body">
                <div className="profile-box">
                    <Status />
                </div>
            </div>
        </div>
    );
}

// {this.state.editing && (
//     <div>
//         <textarea
//             className = "textbox"
//             value = {this.state.newBio}
//             name="draftBio"
//             cols="50"
//             rows="10"
//             onChange = {e => this.handleChange(e)}
//         />
//         < br/>
//         <button className="regi-btn" onClick={ e => this.submit(e) }>Save</button>
//     </div>
// )}
// {this.props.bio && !this.state.editing && (
//     <div>
//         <p>{this.props.bio}</p>
//         <button className="regi-btn" onClick = {() => this.setState({ editing:true })}> Edit your bio! </button>
//     </div>
// )}
// {!this.props.bio && !this.state.editing && (
//     <button className="regi-btn" onClick = {() => this.setState({ editing:true })}> Add your bio! </button>
// )}

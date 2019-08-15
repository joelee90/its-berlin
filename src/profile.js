import React from "react";
import axios from "./axios";
import Status from './status';

export default class Bioeditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
    }

    componentDidMount() {
        this.setState((state, props) => ({ newBio : props.bio }));
    }
    //user's original text is kept before making any changes.

    handleChange(e) {
        this.setState({
            newBio : e.target.value
        });
    }

    submit(e) {
        e.preventDefault();
        axios.post('/bio', {
            bio: this.state.newBio
        })
            .then(({ data }) => {
                this.setState({ editing : false });
                this.props.setBio(data.bio);
            })
            .catch(err => {
                console.log("err in add bio btn", err);
            });
    }

    render() {
        return (
            <div className="profile-body">
                <div className="profile-box">
                    <Status />
                </div>
            </div>
        );
    }
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

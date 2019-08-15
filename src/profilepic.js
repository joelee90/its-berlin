import React from 'react';

export default function ProfilePic ({ url }) {
    // url = url || "/images/default.png";
    return (
        <img src={url} width = "150px"/>
    );
}

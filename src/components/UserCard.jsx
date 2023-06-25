import React from 'react';
import {Link} from 'react-router-dom';

export default function UserCard (props){
    const url = "/users/"+props.name+"/library"
    return (
        <div className='user-card'>
                <img src={props.avatar} />
                <h2>{props.displayName}</h2>
                <Link to={url}>Library</Link>
            </div>
    )
}
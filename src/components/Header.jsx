import React from 'react';
import {Link} from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';

export default function Header(props) {

    function google () {
        window.open("https://young-reaches-15944-2791974435fd.herokuapp.com/auth/google", "_self");
      }

    return (
        <header>
           <span>Alexandria</span> <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><strong> {props.user ? <Link to='/dashboard'>{props.user.username}</Link> : <Link onClick={google}><GoogleIcon id="google-icon" fontSize='small' />Login</Link>}</strong></li>
            </ul> 
        </header>
    )
}
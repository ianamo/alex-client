import React, {useEffect, useState} from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import SearchBox from './SearchBox';

export default function UserDB () {
    const [users, setUsers] = useState([]);
    const [searchMode, setSearchMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    function handleClick() {
        setSearchMode(!searchMode)
    }

    useEffect(()=>{
        axios.get('https://young-reaches-15944-2791974435fd.herokuapp.com/users')
        .then(foundUsers=> setUsers(foundUsers.data));
    },[]);

    return (
        <><SearchBox searchQuery={searchQuery} handleClick={handleClick} searchToggle={searchMode} handleSearch={setSearchQuery} />
        <div className='user-gallery'>
            
        {users
        .filter(user=> {
            if (searchQuery=="") {
                return user;
            } else {
                return user.username.toLowerCase().includes(searchQuery.toLocaleLowerCase());
            }
        })
        .map(user=>
            <UserCard name={user.gid} displayName={user.username} key={user.gid} avatar={user.avatar} />)}
            </div>
            </>
)
    
}
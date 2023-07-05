import React, {useEffect,useState} from 'react';
import axios from 'axios';
import BookGallery from './BookGallery';
import { useParams } from 'react-router-dom';

export default function UserLibrary() {
    const {name} = useParams();
    const [userBooks, setUserBooks] = useState([]);
    //const displayName = name.charAt(0).toUpperCase() + name.slice(1);
    const [username, setUsername] = useState("");

    useEffect(()=>{
        const url = "https://www.alexandria-api.com/users/"+name+"/library";
        axios.get(url)
        .then(userLibraryItems=>{
            const libraryData = userLibraryItems.data;
            setUserBooks(libraryData.map(item=>item.book));
        });

        const userUrl = 'https://www.alexandria-api.com/users/'+name;
        axios.get(userUrl)
        .then(userInfo=>{
            setUsername(userInfo.data.username);
        })
    },[]);

    return (
        <div className='user-library'>
        <h2>{username}'s Library</h2>
        <BookGallery books={userBooks} />
        </div>
    )
}
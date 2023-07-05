import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import '../styles.css';
import axios from 'axios';
import Button from '@mui/material/Button';

export default function BookCard(props) {
    const {isbn, name} = useParams();
    const [bookData, setBookData] = useState({});
    const [sameUser, setUserBool] = useState(false); // Are we in the user's own library?
    const [inLibrary, setInLibrary] = useState(false);
    const [requested, setRequested] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);
    const [addButtonText, setAddButtonText] = useState("Add to Library");
    const [addButtonDisable, setAddButtonDisable] = useState(false);
    const [requestButtonText, setRequestButtonText] = useState("Request Loan");
    const [requestButtonDisable, setRequestButtonDisable] = useState(false);

    useEffect(()=>{
        if (props.user && (name == props.user.gid)) {
            setUserBool(true);
        } else if (!props.user) {
            setUserBool(true);
        }

        if (props.user) {
            const checkUrl = 'https://www.alexandria-api.com/users/'+props.user.gid+'/library/check/'+isbn;
            axios.get(checkUrl)
            .then(
                result=>{
                    console.log("The result of my inquiry is: "+result.data.result);
                    if (result.data.result=="success") {
                        setInLibrary(true);
                    }
                }
            )
        }

        const URL = 'https://www.alexandria-api.com/books/' + isbn;
        axios.get(URL)
        .then(book=>{
            setBookData(book.data);
        });

        if (name) { // check to see if book is available
            const isRequestedUrl = 'https://www.alexandria-api.com/users/'+name+'/library/check/'+isbn;
            axios.get(isRequestedUrl)
            .then(
                response=>{
                    if (response.data.available){
                        setRequested(false);
                    } else {
                        setRequested(true);
                    }
                }
            )
        }
    }, [isbn]);

    function addBook(user) {
        const url = 'https://www.alexandria-api.com/users/'+user.gid+'/library';
            axios.post(url,
            {user:user.gid,
            isbn:isbn});
            setAddButtonText("Added to Library");
            setAddButtonDisable(true);
        
    }

    function makeRequest(user) {
        const url = 'https://www.alexandria-api.com/users/'+name+'/library/request';
        axios.patch(url,
            {borrower:user.gid,
                displayName: user.username,
            isbn:isbn});
        setRequestButtonText("Requested");
        setRequestButtonDisable(true);
    }

    function deleteBook(name,isbn) {
        const delUrl = 'https://www.alexandria-api.com/users/'+name+'/library/'+isbn;
        axios.delete(delUrl);
    }

    return (
        <div className='card-display'>
        <div className="book-card">
  <div className="book-image">
    <img className='book-cover' src={bookData.img} alt="Book Cover" />
  </div>
  <div className="book-details">
    <h2 className="book-title">{bookData.title}</h2>
    <p className="book-author">{bookData.author}</p>
  </div>
  {((props.user&&!sameUser)&&!inLibrary)&&<div className='add-button'><Button disabled={addButtonDisable} onClick={()=> addBook(props.user)}>{addButtonText}</Button></div>}
  {((!sameUser&&name)&&!requested)&& <div className='add-button'><Button disabled={requestButtonDisable} onClick={()=>makeRequest(props.user)}>{requestButtonText}</Button></div>}
  {((sameUser&&name)&&props.user)&&<div className='add-button'><Button disabled={disabledButton} color='error' onClick={()=>{deleteBook(name,isbn); setDisabledButton(true)}}>Remove from Library</Button></div>}
</div>
</div>

    )
}
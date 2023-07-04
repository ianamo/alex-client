import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import BookGallery from './BookGallery';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function BookDB() {
    const [registerIsbn, setRegister] = useState("");
    const [books,getBooks] = useState([]);
    const [registerButtonDisable, setRegisterButtonDisable] = useState(true);
    const [invalidEntry, setInvalidEntry] = useState(false);
    const [helperText, setHelperText] = useState("");
    const nav = useNavigate();

    useEffect(()=>{
        axios.get("https://www.alexandria-api.com/books")
        .then(res=>
            getBooks(res.data));
    },[]);

    function registerBook() {
        axios.post('https://alexandria-api.com/books', {isbn: registerIsbn})
        .then(response => {
            if (response.data == "Success") {
            setTimeout(() => {
            nav('/'+registerIsbn); 
        }, 400);
    } else {
        setHelperText(response.data);
        setInvalidEntry(true);
        setRegisterButtonDisable(true);
    }
})
    

           
    }

    function validateEntry(text){
        setInvalidEntry(true);
        setRegisterButtonDisable(true);
        if (text.length == 10 || text.length == 13) {
            setHelperText("");
            setInvalidEntry(false);
            setRegisterButtonDisable(false);
        } else {
            setHelperText("ISBN must be 10 or 13 digits.");
        }
        if (text == "") {
            setInvalidEntry(false);
        }
    }
    

    return (
        <>
             <div className='input-box'>
                <TextField variant="filled" error={invalidEntry} value={registerIsbn} helperText={helperText} label="ISBN:" onChange={(e)=>{setRegister(e.target.value); validateEntry(e.target.value);}} /> <Button disabled={registerButtonDisable} style={{'margin-top':11}} onClick={registerBook}>Register book</Button>
            </div>
            <BookGallery books={books} />
        </>
    );
}
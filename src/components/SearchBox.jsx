import React from 'react';
import Fab from '@mui/material/Fab';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

export default function SearchBox (props) {
    return (
        <div className='search'><Fab onClick={()=>props.handleClick()} size="small"><SearchIcon /></Fab> {props.searchToggle&& <TextField variant="filled" label="Query:" value={props.searchQuery} onChange={(e)=>props.handleSearch(e.target.value)} />}</div>
    )
}
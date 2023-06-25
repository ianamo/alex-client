import React, {useEffect, useState} from 'react';
import axios from 'axios';
import GalleryItem from './GalleryItem';
import '../styles.css';
import SearchBox from './SearchBox';

export default function BookGallery(props) {
    
    const [searchMode, setSearchMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const books = props.books;

    function handleClick() {
        setSearchMode(!searchMode)
    }

    return(
        <>
        <SearchBox searchQuery={searchQuery} handleClick={handleClick} searchToggle={searchMode} handleSearch={setSearchQuery}  />
        <div className='gallery'>
        {books.filter(book =>{
            if (searchQuery=="") {
                return book;
            } else {
                return book.title.toLowerCase().includes(searchQuery.toLocaleLowerCase());
            }
        })
        .map(book=> <GalleryItem key={book._id} id={book._id} title={book.title} imgLink={book.img} isbn={book.isbn} />)}
        </div>
        </>
    )
}
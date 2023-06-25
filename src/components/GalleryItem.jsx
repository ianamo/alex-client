import React from 'react';
import {Link} from 'react-router-dom';
import '../styles.css'

export default function GalleryItem(props) {
    return(
        <div className='gallery-book'>
        <Link to={props.isbn}><img className='book-cover' alt={props.title} src={props.imgLink} /></Link>
        </div>
    )
}
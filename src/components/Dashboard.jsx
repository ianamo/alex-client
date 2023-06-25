import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Button from '@mui/material/Button';

export default function Dashboard(props) {
    const [requests,setRequests] = useState([]);
    const [loans, setLoans] = useState([]);
    const [loanedBooks, setLoanedBooks] = useState([]);

    useEffect(()=>{
        // figure out if I have any loan requests
        const reqUrl = 'https://young-reaches-15944-2791974435fd.herokuapp.com/users/'+props.user.gid+'/library/request';
        axios.get(reqUrl)
        .then(foundRequests=>{
            const requestData = foundRequests.data;
            setRequests(requestData.map(req=>req));
        });

        // figure out if I have any outstanding loans

        const loanUrl = 'https://young-reaches-15944-2791974435fd.herokuapp.com/users/'+props.user.gid+'/library/loan';
        axios.get(loanUrl)
        .then(foundLoans=>{
            const loanData = foundLoans.data;
            setLoans(loanData.map(loan=>loan));
        });

        const loanedBooksUrl = 'https://young-reaches-15944-2791974435fd.herokuapp.com/users/'+props.user.gid+'/loans';
        axios.get(loanedBooksUrl)
        .then(foundLoans=>{
            const loanedBookData = foundLoans.data;
            setLoanedBooks(loanedBookData.map(book=>book));
        })

    },[]);

    function processLoan(user, borrower, displayName, isbn, deny=false) {
        const url = 'https://young-reaches-15944-2791974435fd.herokuapp.com/users/'+props.user.gid+'/library/loan';
        axios.patch(url, {user:user, borrower:borrower, borrowerDisplayName:displayName, isbn:isbn,deny:deny});
        setRequests(requests.filter(request=>{
            return request.isbn != isbn;
        }));
    }

    function formatDate(date) {
        const myDate = new Date(date);
        return (`${myDate.getFullYear()}-${myDate.getMonth()+1}-${myDate.getDate()}`)
    }

    function returnBook(user, isbn) {
        const returnUrl = 'https://young-reaches-15944-2791974435fd.herokuapp.com/users/'+user+'/library/return';
        axios.patch(returnUrl, {owner:user,isbn:isbn});
        setLoanedBooks(loanedBooks.filter(loan=>{
            return loan.isbn != isbn;
        }));
    }
    
    return (<div className='dashboard-container'>

        <h3>Loan Requests</h3>
        {// map loans onto a UL
        }
        <ul>
            {requests.length == 0 ? <li>You have no requests at this time.</li>:requests.map(req=><li>The book <strong>{req.book.title}</strong> was requested by <strong>{req.requestedByDisplayName}</strong>. <div className='yes-no-btn'><Fab size="small" color="success" onClick={
             ()=> processLoan(props.user.gid, req.requestedBy, req.requestedByDisplayName, req.book.isbn)   
            }><ThumbUpIcon/></Fab></div>
            <div className='yes-no-btn'><Fab size="small" color="error" onClick={
             ()=> processLoan(props.user.username, req.requestedBy, req.requestedByDisplayName, req.book.isbn, true)   
            }><ThumbDownIcon/></Fab></div>
            </li>)}
        </ul>

        <h3>Your Loans</h3>

        <ul>
            {loans.length == 0? <li>You have no loans at this time.</li> : loans.map(loan=><li>You have borrowed the book <strong>{loan.book.title}</strong> from <strong>{loan.ownerDisplayName}</strong>. It is due back on <strong>{formatDate(loan.returnBy)}</strong>. </li>)}

        </ul>

        <h3>Your Loaned Books</h3>
        <ul>
            {loanedBooks.length == 0? <li>You have no books loaned out at this time.</li> : loanedBooks.map(loanBook=><li>The book <strong>{loanBook.book.title}</strong> has been loaned to <strong>{loanBook.borrowerDisplayName}</strong>. Due date is <strong>{formatDate(loanBook.returnBy)}</strong>.
                <Button onClick={()=> returnBook(props.user.gid, loanBook.isbn)}>
                    RETURNED
                </Button> </li>)}
        </ul>

    </div>)
}
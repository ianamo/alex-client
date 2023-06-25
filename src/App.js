import './App.css';
import {Route, Routes} from 'react-router-dom';
import BookDB from './components/BookDB'
import BookCard from './components/BookCard';
import Header from './components/Header';
import UserDB from './components/UserDB';
import UserLibrary from './components/UserLibrary';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import './styles.css'
import { useEffect, useState } from 'react';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("https://young-reaches-15944-2791974435fd.herokuapp.com/auth/google/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          console.log(resObject.user);
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <>
    <Header user={user} />
   <Routes>
    <Route path="/" element={<BookDB />} />
    <Route path="/:isbn" element={<BookCard user={user} />} />
    <Route path="/users" element={<UserDB />} />
    <Route path="/users/:name/library" element={<UserLibrary />} />
    <Route path="/users/:name/library/:isbn" element={<BookCard user={user} />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard user={user} />} />
   </Routes>
   <Footer />
   </>
  );
}

export default App;

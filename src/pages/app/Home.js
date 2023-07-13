import { useEffect, useState } from "react";
import CardBook from "../../components/CardBook";
import SearchBar from "../../components/SearchBar"
import { API } from '../../constants'
import jwt_decode from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

function Home() {

    const [books, setBooks] = useState([])
    const [user,setUser] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        getBooks()
        getUserData()
    }, [])

    const getUserData = () =>{
        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token)
        axios({
            method: 'get',
            url: `${API}/user/${decoded.id_user}`,
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(response => {
            setUser(response.data)
        }).catch(err=>{
            localStorage.removeItem("token")
            navigate("/login")
        })
    }

    const getBooks = () =>{
        axios({
            method: 'get',
            url: `${API}/book`,
            headers:{
                token:localStorage.getItem("token")
            }
        }).then(response=>{
            setBooks(response.data)
        }).catch(err=>{
            localStorage.removeItem("token")
            navigate("/login")
        })
    }

    return (
        <>
            <SearchBar title="Explore all books available" ></SearchBar>
            {/* Looping and Conditional */}
            <div className="book">
                {books.map((book) => {
                    return (<CardBook key={book._id} bookId={book._id} image={book.image} title={book.judul} price={book.harga} description={book.deskripsi} edit={false} button={user.carts?.includes(book._id) ? "Already in Cart" : "Add to Cart"} />)
                })}
            </div>
        </>
    )
}

export default Home;
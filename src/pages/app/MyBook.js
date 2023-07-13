import { useEffect, useState } from "react";
import CardBook from "../../components/CardBook";
import { API } from '../../constants'

import axios from "axios";
import jwtDecode from "jwt-decode";

function MyBook() {

    const [books, setBooks] = useState([])

    useEffect(() => {

        const {id_user} = jwtDecode(localStorage.getItem("token"))
        // Send a POST request
        axios({
            method: 'get',
            url: `${API}/book/getByAuthorId/${id_user}`,
            headers:{
                token:localStorage.getItem("token")
            }
        }).then(response=>{
            setBooks(response.data || [])
        }).catch(err=>{
            console.log(err)
            alert("Opps something is wrong!")
        })

    }, [])

    return (
        <>
            <h1 className="heading-2">My Books</h1>
            <div className="book">
                {books.map((book) => {
                    return (<CardBook status={"UPDATE"} key={book._id} bookId={book._id} image={book.image} title={book.judul} price={book.harga} description={book.deskripsi} edit={true} button={"Edit"} navigate={'/add-book'} />)
                })}
            </div>
        </>
    )
}

export default MyBook;
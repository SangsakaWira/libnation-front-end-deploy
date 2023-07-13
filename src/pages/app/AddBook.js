import axios from "axios"
import { API } from '../../constants'
import InputField from "../../components/InputField";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
// import Dropzone from 'react-dropzone'
import { useDropzone } from 'react-dropzone'
import jwt_decode from "jwt-decode";

function AddBook() {

    const location = useLocation();
    const navigate = useNavigate();
    const [image, setImage] = React.useState("");
    const [status, setStatus] = React.useState("ADD");
    const [book, setBook] = useState({
        _id: "",
        author_id: "",
        judul: "",
        deskripsi: "",
        harga: "",
        image: ""
    })

    const onDrop = (acceptedFiles) => {
        var formData = new FormData();
        formData.append("image", acceptedFiles[0]);
        axios.post(`${API}/helper`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            setImage(response.data.path)
        }).catch(err=>{
            localStorage.removeItem("token")
            navigate("/login")
        })
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    const updateBook = (events) => {
        const { title, description, price } = events.target
        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token)
        axios.post(`${API}/book/`, {
            author_id: decoded.id_user,
            judul: title.value,
            deskripsi: description.value,
            harga: price.value,
            image: image
        }, {
            headers: { token: `${localStorage.getItem("token")}` }
        })
            .then(function (response) {
                if (response.status === 200) {
                    window.alert("Buku berhasil ditambah!")
                }
            })
            .catch(function (error) {
                window.alert("Error!")
                console.log(error);
            });

        events.preventDefault()
    }

    const getBookById = (bookId) => {
        axios({
            method: 'get',
            url: `${API}/book/${bookId}`,
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(response => {
            setBook(response.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const addBook = (events) => {
        const { title, description, price } = events.target
        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token)
        axios.post(`${API}/book/`, {
            author_id: decoded.id_user,
            judul: title.value,
            deskripsi: description.value,
            harga: price.value,
            image: image
        }, {
            headers: { token: `${localStorage.getItem("token")}` }
        })
            .then(function (response) {
                if (response.status === 200) {
                    window.alert("Buku berhasil ditambah!")
                }
            })
            .catch(function (error) {
                window.alert("Error!")
                console.log(error);
            });

        events.preventDefault()
    }

    const deleteBook = () => {
        if (window.confirm("Are you sure?")) {
            axios.delete(`${API}/book/${location.state?.bookId}`, {
                headers: { token: `${localStorage.getItem("token")}` }
            })
                .then(function (response) {
                    if (response.status === 200) {
                        navigate("/my-book")
                    }
                })
                .catch(function (error) {
                    window.alert("Error!")
                    console.log(error);
                })
        }
    }

    const onSubmit = (events) => {
        if (location.state?.status === "UPDATE") {
            updateBook(events)
        } else {
            addBook(events)
        }
    }

    useEffect(() => {
        if (location.state?.status === "UPDATE") {
            getBookById(location.state?.bookId)
            setStatus(location.state?.status)
        }
    }, [])

    return (
        <>
            <h1 className="heading-2 text-left">Add New Book</h1>
            <div className="add-book">
                <form onSubmit={onSubmit} className="add-book-form">
                    <InputField value={book.judul} name="title" type="text" label="Judul" />
                    <InputField value={book.deskripsi} name="description" type="text" label="Description" />
                    <InputField value={book.harga} name="price" type="text" label="Price" />
                    <InputField value={book.download_link} name="download_link" type="text" label="Download Link" />
                    <h3>Image Path</h3>
                    <div {...getRootProps()} >
                        <input {...getInputProps()} />
                        <div className="button-wrap">
                            <div className="btn btn-primary" style={{ textAlign: "center" }}>Upload Image</div>
                        </div>
                    </div>
                    <h5>{image || book.image}</h5>
                    <img style={{ width: "30px" }} src={image} alt="cover book"></img>
                    <div className="button-wrap">
                        <button className="btn btn-primary">{status === "ADD" ? "Submit" : "Update"}</button>
                    </div>
                </form>

            </div>
            <br />
            {(location.state?.status === "UPDATE") && (
                <div className="button-wrap">
                    <button onClick={(deleteBook)} className="btn btn-danger" style={{ width: "100%" }}>Delete</button>
                </div>
            )}
            {/* <Dropzone onDrop={onDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <button className="btn btn-primary">Upload Image</button>
                            </div>
                        </section>
                    )}
                </Dropzone> */}
        </>
    )
}

export default AddBook;
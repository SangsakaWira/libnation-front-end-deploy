import CheckoutCard from "../../components/CheckoutCard";
import { useEffect, useState } from "react";
import axios from "axios"
import { API, numberFormatter } from '../../constants'
import jwt_decode from "jwt-decode";
import { v4 as uuidv4 } from 'uuid';

function Checkout() {

    const [books, setBooks] = useState([])
    const [total, setTotal] = useState(0)
    const [paymentUrl, setPaymentUrl] = useState("")
    const [isPending, setPending] = useState(false)
    const [user, setUser] = useState({
        wallet: "0"
    })

    useEffect(() => {
        getBook()
        getUserData()
        checkTransaction()
    }, [])

    const getUserData = () => {
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
        })
    }

    const checkTransaction = async () => {
        // Send a POST request
        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token)
        await axios({
            method: 'get',
            url: `${API}/transaction/get-pending-transaction/${decoded.id_user}`,
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(response => {
            setPaymentUrl(response.data[0]?.checkout_link)
            if (response.data.length > 0) {
                setPending(true)
            }
        })
    }

    const getBook = () => {
        // Send a POST request
        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token)
        axios({
            method: 'get',
            url: `${API}/user/${decoded.id_user}`,
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(response => {
            response.data.carts.map(book => {
                setTotal(total => total + parseInt(book.harga))
            })
            setBooks(response.data.carts)
        })
    }

    const topUp = () => {
        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token)
        let value = prompt("Masukkan nilai topup: ")
        axios({
            method: 'post',
            url: `${API}/transaction`,
            headers: {
                token: localStorage.getItem("token")
            },
            data: {
                "user_id": decoded.id_user,
                "top_up": parseInt(value),
                "status": "PENDING",
                "payload": {
                    "transaction_details": {
                        "order_id": uuidv4(),
                        "gross_amount": parseInt(value),
                        "payment_link_id": uuidv4()
                    },
                    "usage_limit": 1
                }
            }
        }).then(response => {
            window.alert(response.data.payment_url)
            setPaymentUrl(response.data.payment_url)
        })
    }

    return (
        <>
            <h1 className="heading-2">Checkout</h1>
            <div className="checkout">
                <div className="checkout-detail">
                    <div className="checkout-list">
                        {books.map((book) => {
                            return (<CheckoutCard key={book._id} bookId={book._id} image={book.image} title={book.judul} price={book.harga} description={book.deskripsi} edit={false} button={"Add to Cart"} ></CheckoutCard>)
                        })}
                    </div>
                    <p className="heading-2">Total: <span>{numberFormatter(total)}</span></p>
                    <button className="btn btn-primary">Proceed</button>
                </div>
                <div className="checkout-wallet">
                    <div className="checkout-wallet-card">
                        <h3 className="heading-2">Your Wallet</h3>
                        <h2 className="wallet-price">{numberFormatter(user.wallet)}</h2>
                    </div>
                    {isPending && (
                        <div className="checkout-wallet-card">
                            <h5 className="heading-2" style={{ color: "red",margin:"30px" }}>Finish Pending Transaction</h5>
                            <a className="btn btn-primary" style={{width:"50%"}} href={paymentUrl} target="_blank" >Click Here To Finish</a>
                        </div>
                    )}
                    {!isPending && (<button onClick={topUp} className="btn btn-primary btn-primary">Top Up Wallet</button>)}
                </div>
            </div>
        </>
    )
}

export default Checkout;
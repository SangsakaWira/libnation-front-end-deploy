import axios from "axios"
import { API } from '../constants'
import jwt_decode from "jwt-decode";

function CheckoutCard(props) {

    const removeFromCart = () =>{
        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token)
        axios.put(`${API}/user/remove-book-from-cart`, {
          userId: decoded.id_user,
          bookId: props.bookId,
      }, {
          headers: { token: token }
      })
          .then(function (response) {
              if (response.status === 200) {
                  window.alert(response.data.msg)
                  window.location.href = "/checkout"
              }
          })
          .catch(function (error) {
              window.alert("Error!")
              console.log(error);
          });
      }

    return (
        <div className="checkout-card">
            <div className="checkout-card-thumbnail">
                <img style={{ height: "100%", objectFit: "cover" }} src={props.image} alt="book cover"></img>
            </div>
            <div className="checkout-card-description">
                <h3 className="heading-2">{props.title}</h3>
                <p>{props.description}</p>
                <p className="heading-2">{parseInt(props.price).toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                })}</p>
                <p style={{color:"red"}} onClick={removeFromCart} >Remove</p>
            </div>
        </div>
    )
}

export default CheckoutCard
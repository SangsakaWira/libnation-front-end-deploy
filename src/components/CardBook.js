import { useNavigate } from "react-router-dom";
import axios from "axios"
import { API } from '../constants'
import jwt_decode from "jwt-decode";

function CardBook(props) {

  const navigate = useNavigate()

  const tambahKeCart = () =>{
    const token = localStorage.getItem('token')
    const decoded = jwt_decode(token)
    axios.post(`${API}/user/add-book-to-cart`, {
      userId: decoded.id_user,
      bookId: props.bookId,
  }, {
      headers: { token: token }
  })
      .then(function (response) {
          if (response.status === 200) {
              window.alert(response.data.msg)
          }
      })
      .catch(function (error) {
          window.alert("Error!")
          console.log(error);
      });
  }

  return (
    <div className="book-card">
      <div className="book-card-image">
        <img className="book-image" src={props.image} alt="book cover" />
      </div>
      <div className="book-card-detail">
        <h2 className="heading-2">{props.title}</h2>
        <p>{props.description}</p>
        <p className="heading-2">{
          parseInt(props.price).toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
          })
        }</p>
      </div>
     {props.edit ? (
       <button className="btn btn-primary" onClick={() => {
        navigate(props.navigate, {
          state: {
            bookId: props.bookId,
            status: props.status
          }
        })
      }} >{props.button}</button>
     ) : (
      <button className="btn btn-primary" onClick={tambahKeCart} >{props.button}</button>
     )}
    </div>
  );
}

export default CardBook;

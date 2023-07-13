import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners"

import {API} from "../../constants"

function Register() {

    let navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const login = (events) => {
        events.preventDefault()
        try {
            setLoading(true)
            const { username, password } = events.target
            axios({
                method: 'post',
                url: `${API}/user/register`,
                data: {
                    username: username.value,
                    password: password.value
                }
            }).then(response => {
                setTimeout(() => {
                    if (response.status === 200) {
                        window.alert("Register successfully!")
                        
                        navigate("/login")
                    } else {
                        window.alert("Something wrong!")
                        setLoading(false)
                    }
                }, 2000)
            }).catch(err => {
                window.alert("Username already taken!")
                setLoading(false)
            })
        } catch (err) {
            window.alert("Username already taken!")
            setLoading(false)
        }
    }

    return (
        <>{!loading ? (
            <div className="login" >
                <img src="assets/images/logo.png" alt="logo" className="login-logo" />
                <form onSubmit={login} method="POST">
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" />
                    </div>
                    <div className="input-field">
                        <input type="submit" value="Send New Password" className="btn btn-primary" />
                    </div>
                    <Link to="/login">Go Back</Link>
                </form>
            </div>
        ) : (
            <RingLoader size={130} color="#000000" cssOverride={{ margin: "auto", marginTop: "300px" }} />
        )}</>
    )
}

export default Register;
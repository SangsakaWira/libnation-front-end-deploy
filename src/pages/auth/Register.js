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
                <img src="assets/images/logo.png" alt="logo" style={{width:"50%",margin:"auto auto 20px auto"}} />
                <form onSubmit={login} method="POST">
                <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input type="password" name="confirm_password" id="confirm_password" />
                    </div>
                    <div className="input-field">
                        <input type="submit" value="Register" className="btn btn-primary" />
                        <Link to="/login">Already have an account? Login</Link>
                    </div>
                </form>
            </div>
        ) : (
            <RingLoader size={130} color="#000000" cssOverride={{ margin: "auto", marginTop: "300px" }} />
        )}</>
    )
}

export default Register;
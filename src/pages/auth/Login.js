import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners"

import {API} from "../../constants"

function Login() {

    let navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const login = (events) => {
        events.preventDefault()
        try {
            setLoading(true)
            const { username, password } = events.target
            axios({
                method: 'post',
                url: `${API}/user/login`,
                data: {
                    username: username.value,
                    password: password.value
                }
            }).then(response => {
                setTimeout(() => {
                    if (response.status === 200) {
                        // TOKEN DISIMPAN DI LOCALSTORAGE
                        localStorage.setItem("token", response.data.token)
                        
                        navigate("/")
                    } else {
                        window.alert("Username not found or wrong password!")
                        setLoading(false)
                    }
                }, 2000)
            }).catch(err => {
                window.alert("Username not found or wrong password!")
                setLoading(false)
            })
        } catch (err) {
            window.alert("Username not found or wrong password!")
            setLoading(false)
        }
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/")
        }
    }, [navigate, loading])

    return (
        <>{!loading ? (
            <div className="login" >
                <img src="assets/images/logo.png" alt="logo" className="login-logo" />
                <form onSubmit={login} method="POST">
                    <div className="input-field">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" />
                        <Link to="/forget-password">Forget password</Link>
                    </div>
                    <div className="input-field">
                        <input type="submit" value="Sign In" className="btn btn-primary" />
                        <Link to="/register">Don’t have an account? Register</Link>
                    </div>
                </form>
            </div>
        ) : (
            <RingLoader size={130} color="#000000" cssOverride={{ margin: "auto", marginTop: "300px" }} />
        )}</>
    )
}

export default Login;
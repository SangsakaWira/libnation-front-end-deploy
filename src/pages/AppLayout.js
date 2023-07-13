import { useNavigate } from "react-router-dom";
import { useEffect } from "react"

import NavBar from "../components/NavBar";
import Layout from "../components/Layout";

const AppLayout = ({ children }) => {

    let navigate = useNavigate()

    useEffect(() => {
        try {
            const token = localStorage.getItem('token')
            console.log(token)
            if (!token) {
                navigate("/login")
            }
        } catch (err) {
            localStorage.removeItem('token')
        }
    }, [navigate])

    return (
        <>
            <NavBar></NavBar>
            <Layout>
                {children}
            </Layout>
        </>
    )
}

export default AppLayout
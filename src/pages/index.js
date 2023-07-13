import {Routes,Route} from "react-router-dom";

// Pages
import Home from "./app/Home";
import AddBook from "./app/AddBook";
import Checkout from "./app/Checkout";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ForgetPassword from "./auth/ForgetPassword";
import MyBook from "./app/MyBook";

import AppLayout from "./AppLayout"; // authorization is here

function AppRouter() {

    return (
        <>
            <Routes>

                {/* private */}
                <Route path="/" element={<AppLayout><Home/></AppLayout>} />
                <Route path="/add-book" element={<AppLayout><AddBook/></AppLayout>} />
                <Route path="/my-book" element={<AppLayout><MyBook/></AppLayout>} />
                <Route path="/checkout" element={<AppLayout><Checkout/></AppLayout>} />
                
                {/* public */}
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/forget-password" element={<ForgetPassword/>} />
            </Routes>
        </>
    )
}

export default AppRouter;
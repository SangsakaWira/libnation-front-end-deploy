import { Link, useNavigate } from "react-router-dom";

function NavBar() {

    let navigate = useNavigate()

    const logout = () => {
        if (window.confirm("Are you sure?")) {
            localStorage.removeItem("token")
            navigate("/login")
        }
    }

    return (
        <>
            <header>
                <nav className="nav">
                    <div className="container">
                        <div className="nav-wrap">
                            <div className="nav-left">
                                <Link to="/">
                                    <img className="logo" src="assets/images/logo-nav.png" alt="logo navbar" />
                                </Link>
                                <ul className="nav-menu">
                                    <li className="nav-item"><Link to="/" >Home</Link></li>
                                    <li className="nav-item"><Link to="/my-book" >My Books</Link></li>
                                    <li className="nav-item"><Link to="/add-book" >Add Book</Link></li>
                                    <li className="nav-item"><Link to="/checkout">Checkout</Link></li>
                                    <li className="nav-item" onClick={logout}><Link to="" >Logout</Link></li>
                                </ul>
                            </div>
                            <div className="nav-right">
                                <div className="nav-ellipse"></div>
                                <div className="nav-mobile" id="nav-mobile">
                                    <img src="assets/images/icon-close.svg" alt="close" className="close" />
                                    <img src="assets/images/icon-hamburger.svg" alt="hamburger menu" className="open" />
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default NavBar;
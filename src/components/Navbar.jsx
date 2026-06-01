import { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/auth-context";
import { selectCartCount } from "../store/cartSlice";

function Navbar(){
    const {user, logout} = useContext(AuthContext);
    const cartCount = useSelector(selectCartCount);

    return(
        <nav className="navbar">
            <div className="navbar-container">
                    <Link to="/" className="navbar-brand">ShoppyGlobe</Link>    
                <div className="navbar-links">
                    <Link to="/" className="navbar-link">Home</Link>
                    <Link to="/cart" className="navbar-link cart-link">
                        <svg
                            className="cart-icon"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 .01 0H17ZM4.3 4l2.2 9.4A3 3 0 0 0 9.4 16h6.9a3 3 0 0 0 2.8-1.9L21 9H8.1L7.4 6H3V4h1.3Zm4.2 7h9.6l-.9 2.3a1 1 0 0 1-.9.7H9.4a1 1 0 0 1-1-.8L8.5 11Z" />
                        </svg>
                        <span>Cart</span>
                        <span className="cart-count">{cartCount}</span>
                    </Link>
                </div>
                <div className="navbar-auth">
                    {!user ? <div className="navbar-auth-links"> 
                    <Link to="/auth" className="btn btn-secondary">Login</Link>
                    <Link to="/auth" className="btn btn-primary">Sign up</Link>
                    </div>: (
                        <div className="navbar-user">
                            <span>Hello, {user.email} </span>
                            <button className="btn btn-secondary" onClick={logout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
        </nav>
    );
}

export default Navbar;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { clearCart, selectCartItems, selectCartTotal } from "../store/cartSlice";

export default function Checkout(){
    const [orderPlaced, setOrderPlaced] = useState(false);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (!orderPlaced) {
            return undefined;
        }

        const timerId = setTimeout(() => {
            navigate("/");
        }, 1800);

        return () => clearTimeout(timerId);
    }, [navigate, orderPlaced]);

    function onSubmit() {
        setOrderPlaced(true);
        dispatch(clearCart());
    }

    if (orderPlaced) {
        return (
            <main className="page">
                <div className="container">
                    <div className="order-success">
                        <h1 className="order-success-title">Order placed</h1>
                        <p className="order-success-message">Redirecting to Home...</p>
                    </div>
                </div>
            </main>
        );
    }

    if (cartItems.length === 0) {
        return (
            <main className="page">
                <div className="container empty-cart">
                    <h1 className="page-title">Checkout</h1>
                    <p className="empty-message">Your cart is empty.</p>
                    <Link to="/" className="btn btn-primary">Continue Shopping</Link>
                </div>
            </main>
        );
    }

    return(
        <main className="page">
            <div className="container">
                <h1 className="page-title">Checkout</h1>
                <div className="checkout-container">
                    <form className="checkout-items checkout-form" onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="checkout-section-title">Customer Details</h2>
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">Full Name</label>
                            <input
                                className="form-input"
                                id="name"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <span className="form-error">{errors.name.message}</span>}
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input
                                className="form-input"
                                id="email"
                                type="email"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <span className="form-error">{errors.email.message}</span>}
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="address">Address</label>
                            <textarea
                                className="form-input"
                                id="address"
                                rows="4"
                                {...register("address", { required: "Address is required" })}
                            />
                            {errors.address && <span className="form-error">{errors.address.message}</span>}
                        </div>
                        <button type="submit" className="btn btn-primary btn-large">
                            Place Order
                        </button>
                    </form>

                    <aside className="checkout-summary">
                        <h2 className="checkout-section-title">Order Summary</h2>
                        {cartItems.map((item) => (
                            <div className="summary-item" key={item.id}>
                                <span>{item.title} x {item.quantity}</span>
                                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                            </div>
                        ))}
                        <div className="checkout-total">
                            <span className="checkout-total-label checkout-total-final">Total</span>
                            <span className="checkout-total-value checkout-total-final">
                                ${cartTotal.toFixed(2)}
                            </span>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    )
}

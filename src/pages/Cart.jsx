import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../store/cartSlice";

const CartItem = lazy(() => import("../components/CartItem"));

export default function Cart() {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  if (cartItems.length === 0) {
    return (
      <main className="page">
        <div className="container empty-cart">
          <h1 className="page-title">Your Cart</h1>
          <p className="empty-message">Your cart is empty.</p>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container">
        <h1 className="page-title">Your Cart</h1>
        <div className="checkout-container">
          <section className="checkout-items">
            <Suspense fallback={<p className="status-message">Loading cart...</p>}>
              {cartItems.map((item) => (
                <CartItem item={item} key={item.id} />
              ))}
            </Suspense>
          </section>

          <aside className="checkout-summary">
            <h2 className="checkout-section-title">Cart Summary</h2>
            <div className="checkout-total">
              <span className="checkout-total-label">Subtotal</span>
              <span className="checkout-total-value">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="checkout-total">
              <span className="checkout-total-label">Shipping</span>
              <span className="checkout-total-value">Free</span>
            </div>
            <div className="checkout-total">
              <span className="checkout-total-label checkout-total-final">Total</span>
              <span className="checkout-total-value checkout-total-final">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <Link to="/checkout" className="btn btn-primary btn-block">
              Checkout
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

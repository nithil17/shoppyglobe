import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/cartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const itemTotal = item.price * item.quantity;

  return (
    <div className="checkout-item">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="checkout-item-image"
        loading="lazy"
      />
      <div className="checkout-item-details">
        <h3 className="checkout-item-name">{item.title}</h3>
        <p className="checkout-item-price">${item.price}</p>
      </div>
      <div className="checkout-item-controls">
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            type="button"
            disabled={item.quantity === 1}
            onClick={() => dispatch(decreaseQuantity(item.id))}
            aria-label={`Decrease ${item.title} quantity`}
          >
            -
          </button>
          <span className="quantity-value">{item.quantity}</span>
          <button
            className="quantity-btn"
            type="button"
            onClick={() => dispatch(increaseQuantity(item.id))}
            aria-label={`Increase ${item.title} quantity`}
          >
            +
          </button>
        </div>
        <p className="checkout-item-total">${itemTotal.toFixed(2)}</p>
        <button
          className="btn btn-secondary btn-small"
          type="button"
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

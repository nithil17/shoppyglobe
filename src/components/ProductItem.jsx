import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartItems } from "../store/cartSlice";

export default function ProductItem({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const productInCart = cartItems.find((item) => item.id === product.id);
  const productQuantityLabel = productInCart ? `(${productInCart.quantity})` : "";

  return (
    <div className="product-card">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="product-card-image"
        loading="lazy"
      />
      <div className="product-card-content">
        <h3 className="product-card-name">{product.title}</h3>
        <p className="product-card-price">${product.price}</p>
        <div className="product-card-actions">
          <Link to={`/products/${product.id}`} className="btn btn-secondary">
            View Details
          </Link>
          <button
            className="btn btn-primary"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart {productQuantityLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

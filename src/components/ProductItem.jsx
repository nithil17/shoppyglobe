import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartItems } from "../store/cartSlice";

export default function ProductItem({ product }) {
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const productInCart = cartItems.find((item) => item.id === product.id);
  const cartQuantity = productInCart?.quantity || 0;
  const stockLimit = product.stock || 99;
  const isAtStockLimit = cartQuantity >= stockLimit;

  function handleAddToCart() {
    dispatch(addToCart(product));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

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
        <p className="stock-text">
          {isAtStockLimit ? "Stock limit reached" : `${stockLimit - cartQuantity} left`}
        </p>
        <div className="product-card-actions">
          <Link to={`/products/${product.id}`} className="btn btn-secondary">
            View Details
          </Link>
          <button
            className="btn btn-primary"
            disabled={isAtStockLimit}
            onClick={handleAddToCart}
          >
            {isAtStockLimit ? "In Cart" : added ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    stock: PropTypes.number,
  }).isRequired,
};

import { Link } from "react-router-dom";
import { useCart } from "../context/cart-context";

export default function ProductCard({product}){
    const {addToCart, cartItems} = useCart()
    const productInCart = cartItems.find((item)=> item.id===product.id);
    const productQuantityLable = productInCart ? `(${productInCart.quantity})` : "";

    return(
          <div className="product-card" key={product.id}>
            <img src={product.thumbnail} alt={product.title} className="product-card-image"/>
            <div className="product-card-content">
                <h3 className="product-card-name">{product.title}</h3>
                <p className="product-card-price">{product.price}</p>
                <div className="product-card-actions">
                    <Link to={`/products/${product.id}`} className="btn btn-secondary">View Details</Link>
                    <button className="btn btn-primary" onClick={()=>addToCart(product.id)}>Add to Cart {productQuantityLable}</button>
                </div>
            </div>

        </div>
    );

}

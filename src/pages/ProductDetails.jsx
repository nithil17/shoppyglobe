import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartItems } from "../store/cartSlice";

export default function ProductDetails(){
    const {id} = useParams()
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    useEffect(()=>{
        async function fetchProduct(){
            setLoading(true);
            setError("");

            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch product");
                }

                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    },[id]);

    if (loading) {
        return <h1 className="status-message">Loading product...</h1>;
    }

    if (error || !product) {
        return <h1 className="status-message">{error || "Product not found"}</h1>;
    }

    const productInCart = cartItems.find((item)=> item.id===product.id);
    const productQuantityLabel = productInCart ? `(${productInCart.quantity})` : "";

    return (
    <main className="page">
        <div className="container">
            <div className="product-detail">
                <div className="product-detail-image">
                    <img src={product.thumbnail} alt={product.title} loading="lazy" />
                </div>
                <div className="product-detail-content">
                    <h1 className="product-detail-name">{product.title}</h1>
                    <p className="product-detail-price">${product.price}</p>
                    <p className="product-detail-description">{product.description}</p>
                    <button
                        className="btn btn-primary"
                        onClick={()=>dispatch(addToCart(product))}
                    >
                        Add to Cart {productQuantityLabel}
                    </button>
                </div>
            </div>
        </div>
    </main>);
}

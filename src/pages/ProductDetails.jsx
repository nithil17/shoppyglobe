import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartItems } from "../store/cartSlice";

export default function ProductDetails(){
    const {id} = useParams()
    const [product, setProduct] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [added, setAdded] = useState(false);
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
    const cartQuantity = productInCart?.quantity || 0;
    const stockLimit = product.stock || 99;
    const remainingStock = Math.max(stockLimit - cartQuantity, 0);
    const isAtStockLimit = remainingStock === 0;

    function handleQuantityChange(event) {
        const nextQuantity = Number(event.target.value);
        setSelectedQuantity(Math.max(1, Math.min(nextQuantity, remainingStock || 1)));
    }

    function handleAddToCart() {
        dispatch(addToCart({ product, quantity: selectedQuantity }));
        setAdded(true);
        setSelectedQuantity(1);
        window.setTimeout(() => setAdded(false), 1200);
    }

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
                    <p className="stock-text">
                        {isAtStockLimit
                            ? "You have added all available stock."
                            : `${remainingStock} available to add`}
                    </p>
                    <div className="detail-cart-controls">
                        <label className="form-label" htmlFor="product-quantity">Quantity</label>
                        <input
                            className="form-input quantity-input"
                            id="product-quantity"
                            type="number"
                            min="1"
                            max={remainingStock || 1}
                            value={selectedQuantity}
                            disabled={isAtStockLimit}
                            onChange={handleQuantityChange}
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        disabled={isAtStockLimit}
                        onClick={handleAddToCart}
                    >
                        {isAtStockLimit ? "Stock Limit Reached" : added ? "Added to Cart" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    </main>);
}

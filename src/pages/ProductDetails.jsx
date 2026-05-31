import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsById } from "../hooks/useProducts";
import useProducts from "../hooks/useProducts";

export default function ProductDetails(){
    const {id} = useParams()
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // useEffect(()=>{
    //     const foundProduct = getProductsById(id);
    //     console.log(foundProduct);
    // },[]);

    useEffect(()=>{
        async function fetchProduct(){
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
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
    <div className="page">
        <div className="container">
            <div className="product-detail">
                <div className="product-detail-image">
                    <img src={product.images} alt={product.name} />
                </div>
                <div className="product-detial-content">
                    <h1 className="product-detail-name">{product.name}</h1>
                    <p className="product-detail-price">{product.price}</p>
                    <p className="product-detail-description">{product.description}</p>
                    <button className="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
        ProductDetails Page {product.title}</div>);
}

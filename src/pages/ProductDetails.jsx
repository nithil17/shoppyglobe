import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails(){
    const {id} = useParams()
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    return <div>ProductDetails Page {product.title}</div>;
}

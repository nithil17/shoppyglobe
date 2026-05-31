import { useEffect, useState } from "react";

function useProducts(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(()=>{
        async function fetchProducts() {
            try {
                const response = await fetch("https://dummyjson.com/products")

                if (!response.ok) {
                throw new Error("Failed to fetch products");       
                }

                const data = await response.json();

                setProducts(data.products);
            } catch (error) {
                setError(error.message);
            } finally {

                setLoading(false);

            }
            
        }
        fetchProducts();
    },[]);
    return { products, loading, error };
}

export default useProducts;

export function getProductsById(id){
return products.find((p)=>p.id===Number(id))
}

import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

export default function Home() {

    const { products, loading, error } = useProducts();

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    return (

        <div className="home">

            <div className="home-hero">
                <h1 className="home-title">Home Page</h1>
                <p className="home-subtitle">
                    Explore Amazing Products
                </p>
            </div>

            <div className="container">

                <h2 className="page-title">
                    Our Products
                </h2>

                <div className="product-grid">

                    {products.map((product) => (

                        <ProductCard
                            product={product}
                            key={product.id}
                        />

                    ))}

                </div>

            </div>

        </div>
    );
}
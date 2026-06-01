import ProductList from "../components/ProductList";

export default function Home() {
    return (
        <div className="home">
            <div className="home-hero">
                <h1 className="home-title">ShoppyGlobe</h1>
                <p className="home-subtitle">
                    Explore Amazing Products
                </p>
            </div>

            <ProductList />
        </div>
    );
}

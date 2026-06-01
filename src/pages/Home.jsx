import { lazy, Suspense } from "react";

const ProductList = lazy(() => import("../components/ProductList"));

export default function Home() {
    return (
        <div className="home">
            <div className="home-hero">
                <h1 className="home-title">ShoppyGlobe</h1>
                <p className="home-subtitle">
                    Explore Amazing Products
                </p>
            </div>

            <Suspense fallback={<h1 className="status-message">Loading products...</h1>}>
                <ProductList />
            </Suspense>
        </div>
    );
}

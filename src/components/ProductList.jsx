import { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import useProducts from "../hooks/useProducts";
import { selectSearchQuery, setSearchQuery } from "../store/searchSlice";

const ProductItem = lazy(() => import("./ProductItem"));

export default function ProductList() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const { products, loading, error } = useProducts();

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return (
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return <h1 className="status-message">Loading products...</h1>;
  }

  if (error) {
    return <h1 className="status-message">{error}</h1>;
  }

  return (
    <section className="container">
      <div className="product-list-header">
        <h2 className="page-title">Our Products</h2>
        <input
          className="form-input search-input"
          type="search"
          value={searchQuery}
          placeholder="Search products"
          onChange={(event) => dispatch(setSearchQuery(event.target.value))}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="empty-message">No products match your search.</p>
      ) : (
        <div className="product-grid">
          <Suspense fallback={<p className="status-message">Loading cards...</p>}>
            {filteredProducts.map((product) => (
              <ProductItem product={product} key={product.id} />
            ))}
          </Suspense>
        </div>
      )}
    </section>
  );
}

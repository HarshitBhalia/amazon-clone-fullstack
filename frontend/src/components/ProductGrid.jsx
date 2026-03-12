import ProductCard from './ProductCard';

function ProductGrid({ products, loading }) {
  if (loading) {
    return (
      <div className="product-grid-loading">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="product-card-skeleton">
            <div className="skeleton-image"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
            <div className="skeleton-text shorter"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="no-products">
        <h2>No products found</h2>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="product-grid" id="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;

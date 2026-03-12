import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel';
import SearchBar from '../components/SearchBar';
import ProductGrid from '../components/ProductGrid';
import { getProducts } from '../services/api';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getProducts(currentSearch, currentCategory);
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentSearch, currentCategory]);

  const handleSearch = (query) => {
    const params = {};
    if (query) params.search = query;
    if (currentCategory) params.category = currentCategory;
    setSearchParams(params);
  };

  const handleCategoryChange = (category) => {
    const params = {};
    if (currentSearch) params.search = currentSearch;
    if (category) params.category = category;
    setSearchParams(params);
  };

  return (
    <div className="home-page" id="home-page">
      <ImageCarousel />
      <div className="home-content">
        <SearchBar
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          currentSearch={currentSearch}
          currentCategory={currentCategory}
        />
        <div className="section-header">
          <h2>
            {currentCategory
              ? `${currentCategory}`
              : currentSearch
                ? `Results for "${currentSearch}"`
                : 'Featured Products'}
          </h2>
          <span className="product-count">{products.length} products</span>
        </div>
        <ProductGrid products={products} loading={loading} />
      </div>
    </div>
  );
}

export default HomePage;

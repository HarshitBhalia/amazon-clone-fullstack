import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { getCategories } from '../services/api';

function SearchBar({ onSearch, onCategoryChange, currentSearch, currentCategory }) {
  const [search, setSearch] = useState(currentSearch || '');
  const [categories, setCategoriesList] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategoriesList(response.data.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setSearch(currentSearch || '');
  }, [currentSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <div className="search-filter-bar" id="search-filter-bar">
      <form className="inline-search" onSubmit={handleSubmit}>
        <input
          type="text"
          className="inline-search-input"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="inline-search-btn">
          <FiSearch /> Search
        </button>
      </form>
      <div className="category-filters">
        <button
          className={`category-chip ${!currentCategory ? 'active' : ''}`}
          onClick={() => onCategoryChange('')}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-chip ${currentCategory === cat ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;

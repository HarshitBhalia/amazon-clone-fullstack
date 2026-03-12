import { useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&h=400&fit=crop',
    alt: 'Great deals on electronics'
  },
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=400&fit=crop',
    alt: 'Fashion sale'
  },
  {
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&h=400&fit=crop',
    alt: 'Home & Kitchen essentials'
  },
  {
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1400&h=400&fit=crop',
    alt: 'Best selling books'
  }
];

function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="hero-carousel" id="hero-carousel">
      <div className="carousel-slides">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.image} alt={slide.alt} />
          </div>
        ))}
      </div>
      <button className="carousel-btn carousel-prev" onClick={prevSlide} aria-label="Previous slide">
        <FiChevronLeft />
      </button>
      <button className="carousel-btn carousel-next" onClick={nextSlide} aria-label="Next slide">
        <FiChevronRight />
      </button>
      <div className="carousel-dots">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="carousel-fade"></div>
    </div>
  );
}

export default ImageCarousel;

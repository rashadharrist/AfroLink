import React, { useState } from 'react';
import './ServiceSlider.css';

function ServiceSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { title: 'Locticians', image: 'locs.jpg' },
    { title: 'Braids', image: 'braids.jpeg' },
    { title: 'Lashes', image: 'lashes.jpeg' },
    { title: 'Rideshare', image: 'Rideshare.jpeg' },
    { title: 'Barbers', image: 'barbers.jpeg' },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="slider-container">
      {slides.map((slide, index) => (
        <div key={index} className={index === currentSlide ? 'slide active' : 'slide'}>
          <img src={slide.image} alt={slide.title} />
          <div className="slide-content">
            <h2>{slide.title}</h2>
            {/* Add more content here if needed */}
          </div>
        </div>
      ))}
      <button onClick={prevSlide}>Previous</button>
      <button onClick={nextSlide}>Next</button>
    </div>
  );
}

export default ServiceSlider;
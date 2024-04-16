import React from 'react';
import Navbar from './Navbar'; 
import SearchBar from './SearchBar';
import Introduction from './Introduction';
import ServiceSlider from './ServiceSlider'; 
import AboutPage from './AboutPage'; 
import './/App.css';  
const HomePage = () => {
  return (
      <div style={{ background: 'linear-gradient(45deg, #cf142b 0%, #002b36 100%)' }}>
          <Navbar />
          <SearchBar />  
          <Introduction />  
          <ServiceSlider />  
          <AboutPage /> 
      </div>
  );
};

export default HomePage;
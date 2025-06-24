import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import Testimonials from '../components/landing/Testimonials';
import RecentPlacesRent from '../components/landing/RecentPlacesRent';
import LandingFeatureSection from '../components/landing/LandingFeatureSection';
 
const Landing = () => {
    return (
      <div className="font-sans text-gray-800 leading-relaxed">
      
        <HeroSection />
        <LandingFeatureSection/>
        <RecentPlacesRent/>
        <Features />
        <HowItWorks />
        <Testimonials />
      
      </div>
    );
  };

export default Landing;
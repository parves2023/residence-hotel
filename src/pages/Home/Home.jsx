import React from 'react';
import Slider from './Slider';
import ContactSection from './ContactSection';
import FeaturedRooms from './FeaturedRooms';
import ReactTitle from "react-helmet";
import WhyChooseUs from './WhyChooseUs';
import ExploreAmenities from './ExploreAmenities';
import FAQ from './FAQ';
import ReviewsPage from './ReviewsPage';
import SpecialOffersModal from './SpecialOffersModal/SpecialOffersModal';
import OurSpecialOffers from './OurSpecialOffers/OurSpecialOffers';


// added home pages and there section

function Home() {
  return (
    <div className="home-container">
      <ReactTitle title="RH || Home"/>
      {/* Slider Component */}
      <Slider />

    <div className='my-16 container overflow-hidden mx-auto rounded-2xl'>
    <FeaturedRooms></FeaturedRooms>
    <SpecialOffersModal />
    <WhyChooseUs></WhyChooseUs>
    <ExploreAmenities></ExploreAmenities>
    <OurSpecialOffers></OurSpecialOffers>
    <ReviewsPage></ReviewsPage>
    <FAQ></FAQ>
    <ContactSection></ContactSection>

    </div>
    </div>
  );
}

export default Home;

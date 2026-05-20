// import React from 'react';

import Banner from "../Banner/Banner";
import CreatorCategories from "../Brands/CreatorCategories";
import ContributionSection from "../Contribution/ContributionSection";
import PopularContest from "../PopularContest/PopularContest";
import WinnerAdvertisement from "../WinnerAdvertisement/WinnerAdvertisement";
// import Brands from "../Brands/CreatorCategories";

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <CreatorCategories></CreatorCategories>
           <PopularContest></PopularContest>
           <WinnerAdvertisement></WinnerAdvertisement>
           <ContributionSection></ContributionSection>
        </div>
    );
};

export default Home;
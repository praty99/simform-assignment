import React from 'react';

import HeaderSectionContainer from './header-section/HeaderSectionContainer';
import AddCategorySectionContainer from './add-category-section/AddCategorySectionContainer';
import CategoriesListSectionContainer from './categories-list-section/CategoriesListSectionContainer';

const Home = () => (
  <div className="home">
    <HeaderSectionContainer />
    <AddCategorySectionContainer />
    <CategoriesListSectionContainer />
  </div>
);

export default Home;

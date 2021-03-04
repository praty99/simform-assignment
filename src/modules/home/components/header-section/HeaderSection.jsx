import React from 'react';
import PropTypes from 'prop-types';
import { noop } from '../../../../utils';

const HeaderSection = ({ handleOnClick }) => (
  <section className="header-section-container">
    <div className="header-section">
      <h1 className="section-title">CATEGORY</h1>
      <button className="expand" type="button" onClick={handleOnClick}>Expand All</button>
    </div>
  </section>
);

HeaderSection.propTypes = {
  handleOnClick: PropTypes.func,
};

HeaderSection.defaultProps = {
  handleOnClick: noop,
};

export default HeaderSection;

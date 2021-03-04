import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderSection from './HeaderSection';
import { noop } from '../../../../utils';
import * as actions from '../../redux/actions';

const HeaderSectionContainer = ({ expandAll }) => {
  const [expand, setExpand] = useState(false);
  const handleOnClick = () => {
    setExpand((prev) => !prev);
  };

  useEffect(() => {
    expandAll(expand);
  }, [expand]);

  return (
    <HeaderSection handleOnClick={handleOnClick} />
  );
};

HeaderSectionContainer.propTypes = {
  expandAll: PropTypes.func,
};

HeaderSectionContainer.defaultProps = {
  expandAll: noop,
};

const mapDispatchToProps = (dispatch) => ({
  expandAll: (expand) => dispatch(actions.expandAll(expand)),
});

export default connect(null, mapDispatchToProps)(HeaderSectionContainer);

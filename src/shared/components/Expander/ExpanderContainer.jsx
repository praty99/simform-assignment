import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import PropTypes from 'prop-types';

import Expander from './Expander';

const ExpanderContainer = ({
  title, children, defaultExpanded, showExpandButton,
  disabled, expandedIcon, collapsedIcon, className,
  expandAll,
}) => {
  const [expand, setExpand] = useState(false);
  const [expanderHeight, setExpanderHeight] = useState(0);
  const bodyRef = useRef(null);

  const _setExpanderHeight = useCallback((_expand, _bodyRef) => {
    const _expanderHeight = _expand && _bodyRef.current ? _bodyRef.current.clientHeight : 0;
    setExpanderHeight(_expanderHeight);
  }, []);

  useEffect(() => {
    setExpand(defaultExpanded);
    _setExpanderHeight(expand, bodyRef);
  }, []);

  useEffect(() => {
    setExpand((prevState) => !prevState);
  }, [expandAll]);

  useEffect(() => {
    _setExpanderHeight(expand, bodyRef);
  }, [expand, children]);

  const toggleExpand = () => {
    if (showExpandButton) setExpand((prevState) => !prevState);
  };

  // This method is useful when nested expanders are available.
  const handleTransitionEnd = () => {
    _setExpanderHeight(expand, bodyRef);
  };

  return (
    <Expander
      title={title}
      expand={expand}
      toggleExpand={toggleExpand}
      bodyRef={bodyRef}
      handleTransitionEnd={handleTransitionEnd}
      showExpandButton={showExpandButton}
      expanderHeight={expanderHeight}
      disabled={disabled}
      expandedIcon={expandedIcon}
      collapsedIcon={collapsedIcon}
      className={className}
    >
      {children}
    </Expander>
  );
};

ExpanderContainer.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  defaultExpanded: PropTypes.bool,
  showExpandButton: PropTypes.bool,
  disabled: PropTypes.bool,
  expandedIcon: PropTypes.string,
  collapsedIcon: PropTypes.string,
  className: PropTypes.string,
  expandAll: PropTypes.bool,
};

ExpanderContainer.defaultProps = {
  title: '',
  children: <div />,
  defaultExpanded: false,
  showExpandButton: true,
  disabled: false,
  expandedIcon: '',
  collapsedIcon: '',
  className: '',
  expandAll: false,
};

export default ExpanderContainer;

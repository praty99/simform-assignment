import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { noop } from '../../../utils';

const Expander = ({
  title, children, expand, toggleExpand,
  bodyRef, handleTransitionEnd, showExpandButton, expanderHeight, disabled,
  expandedIcon, collapsedIcon, className,
}) => (
  <div className={classNames('expander', className)}>
    {
      title && (
        <div
          className="expander-header"
          role="presentation"
          onClick={!disabled && toggleExpand}
          onKeyDown={noop}
        >
          <div className="expander-header-content">
            {
              (typeof title === 'string' || title instanceof String)
                ? <p className="expander-title">{title}</p>
                : <div className="expander-title">{title}</div>
            }
          </div>
          {
            !disabled && showExpandButton
            && (
              <img
                src={
                  expand
                    ? expandedIcon || 'images/minus.svg'
                    : collapsedIcon || 'images/plus.svg'
                }
                alt=""
                className={classNames('expander-button-image', { expand })}
              />
            )
          }
        </div>
      )
    }
    <div
      className={classNames('expander-children', { expand })}
      onTransitionEnd={handleTransitionEnd}
      style={{
        height: expanderHeight,
      }}
    >
      <div className="expander-body" ref={bodyRef}>
        {children}
      </div>
    </div>
  </div>
);

Expander.propTypes = {
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
  expand: PropTypes.bool,
  toggleExpand: PropTypes.func,
  bodyRef: PropTypes.instanceOf(Object),
  handleTransitionEnd: PropTypes.func,
  showExpandButton: PropTypes.bool,
  expanderHeight: PropTypes.number,
  disabled: PropTypes.bool,
  expandedIcon: PropTypes.string,
  collapsedIcon: PropTypes.string,
  className: PropTypes.string,
};

Expander.defaultProps = {
  title: '',
  children: <div />,
  expand: false,
  toggleExpand: noop,
  bodyRef: {},
  handleTransitionEnd: noop,
  showExpandButton: true,
  expanderHeight: 0,
  disabled: false,
  expandedIcon: '',
  collapsedIcon: '',
  className: '',
};

export default Expander;

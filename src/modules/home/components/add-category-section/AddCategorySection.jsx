import React from 'react';
import PropTypes from 'prop-types';
import { noop } from '../../../../utils';

const AddCategorySection = ({
  categoryName, handleChange, handleSubmit, showError,
  parentCategoryId, currentCategoryId,
}) => {
  console.log(parentCategoryId);
  console.log(currentCategoryId);
  return (
    <section className="add-category-section-container">
      <div className="add-category-section">
        <div className="add-category">
          <button
            className="save-category"
            type="button"
            onClick={handleSubmit}
          >
            {
              // eslint-disable-next-line no-nested-ternary
              parentCategoryId
                ? 'Add sub category'
                : currentCategoryId
                  ? 'Edit category'
                  : 'Add new category'
            }
          </button>
          <input type="text" name="category" onChange={handleChange} value={categoryName} />
        </div>
        {showError && (<span className="error">Category Name can not be empty.</span>)}
      </div>
    </section>
  );
};

AddCategorySection.propTypes = {
  categoryName: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  showError: PropTypes.bool,
  parentCategoryId: PropTypes.string,
  currentCategoryId: PropTypes.string,
};

AddCategorySection.defaultProps = {
  categoryName: '',
  handleChange: noop,
  handleSubmit: noop,
  showError: false,
  parentCategoryId: '',
  currentCategoryId: '',
};

export default AddCategorySection;

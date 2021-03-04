import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CategoriesSection from './CategoriesListSection';
import * as actions from '../../redux/actions';
import { noop } from '../../../../utils';

const CategoriesListSectionContainer = ({
  getCategoriesList, categoriesList, deleteCategory,
  expandAll,
}) => {
  const [addSubCategory, setAddSubCategory] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState('');
  const [editCategory, setEditCategory] = useState(false);
  const [expand, setExpand] = useState(expandAll);

  useEffect(() => {
    getCategoriesList();
  }, []);

  useEffect(() => {
    setExpand(expandAll);
  }, [expandAll]);

  const handleContextMenuClick = (data) => {
    if (data.action === 'delete') {
      deleteCategory(data.category.id);
    }
    if (data.action === 'add') {
      setAddSubCategory(true);
      setEditCategory(false);
      setCurrentCategoryId(data.category.id);
    }
    if (data.action === 'edit') {
      setEditCategory(true);
      setAddSubCategory(false);
      setCurrentCategoryId(data.category.id);
    }
  };

  return (
    <CategoriesSection
      categoriesList={categoriesList}
      handleContextMenuClick={handleContextMenuClick}
      addSubCategory={addSubCategory}
      currentCategoryId={currentCategoryId}
      editCategory={editCategory}
      setEditCategory={setEditCategory}
      setAddSubCategory={setAddSubCategory}
      expand={expand}
    />
  );
};

CategoriesListSectionContainer.propTypes = {
  getCategoriesList: PropTypes.func,
  categoriesList: PropTypes.instanceOf(Array),
  deleteCategory: PropTypes.func,
  expandAll: PropTypes.bool,
};

CategoriesListSectionContainer.defaultProps = {
  getCategoriesList: noop,
  categoriesList: [],
  deleteCategory: noop,
  expandAll: false,
};

const mapStateToProps = (state) => ({
  categoriesList: state.home.categories,
  expandAll: state.home.expandAll,
});

const mapDispatchToProps = (dispatch) => ({
  getCategoriesList: () => dispatch(actions.getCategoriesList()),
  deleteCategory: (categoryId) => dispatch(actions.deleteCategory(categoryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesListSectionContainer);

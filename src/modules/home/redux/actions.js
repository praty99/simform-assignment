import * as actionTypes from './actionTypes';

export const addNewCategory = (id, categoryName) => ({
  type: actionTypes.ADD_NEW_CATEGORY,
  payload: ({
    data: {
      id,
      categoryName,
    },
  }),
});

export const getCategoriesList = () => ({
  type: actionTypes.GET_CATEGORIES_LIST,
});

export const deleteCategory = (categoryId) => ({
  type: actionTypes.DELETE_CATEGORY,
  payload: categoryId,
});

export const editCategory = (categoryId, categoryName) => ({
  type: actionTypes.EDIT_CATEGORY,
  payload: ({ data: { categoryId, categoryName } }),
});

export const addSubCategory = (parentCategoryId, categoryId, categoryName) => ({
  type: actionTypes.ADD_SUB_CATEGORY,
  payload: ({
    data: {
      parentCategoryId,
      categoryId,
      categoryName,
    },
  }),
});

export const expandAll = (expand) => ({
  type: actionTypes.EXPAND_ALL,
  payload: expand,
});

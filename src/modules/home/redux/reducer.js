import * as actionTypes from './actionTypes';

const localInitialState = localStorage.getItem('categories');
let localState = [];
if (localInitialState) {
  localState = JSON.parse(localInitialState);
}

const initialState = {
  categories: localState,
  expandAll: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_NEW_CATEGORY: {
      const categoriesList = [
        ...state.categories,
        {
          id: payload.data.id,
          name: payload.data.categoryName,
        },
      ];
      localStorage.setItem('categories', JSON.stringify(categoriesList));
      return {
        ...state,
        categories: categoriesList,
      };
    }
    case actionTypes.GET_CATEGORIES_LIST: {
      let localStorageState = localStorage.getItem('categories');
      if (localStorageState) {
        localStorageState = JSON.parse(localInitialState);
      }
      return {
        ...state,
        categories: localStorageState || [],
      };
    }
    case actionTypes.DELETE_CATEGORY: {
      const deleteCategory = (id, data) => data.reduce((arr, item) => {
        if (item.id !== id) {
          if (item.subCategories) {
            // eslint-disable-next-line no-param-reassign
            item.subCategories = deleteCategory(id, item.subCategories);
          }
          arr.push(item);
        }
        return arr;
      }, []);
      const categoriesList = deleteCategory(payload, state.categories);
      localStorage.setItem('categories', JSON.stringify(categoriesList));
      return {
        ...state,
        categories: categoriesList,
      };
    }
    case actionTypes.EDIT_CATEGORY: {
      const editCategoryDetails = (id, name, data) => data.reduce((arr, item) => {
        if (item.id === id) {
          arr.push({ ...item, name });
        } else if (item.subCategories) {
          // eslint-disable-next-line no-param-reassign
          item.subCategories = editCategoryDetails(id, name, item.subCategories);
          arr.push(item);
        } else {
          arr.push(item);
        }
        return arr;
      }, []);
      const categoriesList = editCategoryDetails(
        payload.data.categoryId, payload.data.categoryName, state.categories,
      );
      localStorage.setItem('categories', JSON.stringify(categoriesList));
      return {
        ...state,
        categories: categoriesList,
      };
    }
    case actionTypes.ADD_SUB_CATEGORY: {
      const addSubCategory = (
        parentCategoryId, id, name, data,
      ) => data.reduce((arr, item) => {
        if (item.id === parentCategoryId) {
          let _item = {};
          if (item.subCategories) {
            _item = {
              ...item,
              subCategories: [
                ...item.subCategories,
                {
                  id,
                  name,
                },
              ],
            };
          } else {
            _item = {
              ...item,
              subCategories: [
                {
                  id,
                  name,
                },
              ],
            };
          }
          arr.push(_item);
        } else if (item.subCategories) {
          // eslint-disable-next-line no-param-reassign
          item.subCategories = addSubCategory(
            parentCategoryId, id, name, item.subCategories,
          );
          arr.push(item);
        } else {
          arr.push(item);
        }
        return arr;
      }, []);
      const categoriesList = addSubCategory(
        payload.data.parentCategoryId,
        payload.data.categoryId,
        payload.data.categoryName,
        state.categories,
      );
      localStorage.setItem('categories', JSON.stringify(categoriesList));
      return {
        ...state,
        categories: categoriesList,
      };
    }
    case actionTypes.EXPAND_ALL: {
      return {
        ...state,
        expandAll: payload,
      };
    }
    default:
      return state;
  }
};

import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCTS_LOADING
} from "../actions/types";
import axios from "axios";

export const getProducts = () => dispatch => {
  dispatch(setProductsLoading());

  axios.get("http://127.0.0.1:5000/api/products/").then(res =>
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    })
  );
};

export const addProduct = product => dispatch => {
  axios.post("http://127.0.0.1:5000/api/products/", product).then(res =>
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data
    })
  );
};

export const deleteProduct = id => dispatch => {
  axios.delete(`http://127.0.0.1:5000/api/products/${id}`).then(res =>
    dispatch({
      type: DELETE_PRODUCT,
      payload: id
    })
  );
};

export const updateProduct = id => dispatch => {
  axios.put(`http://127.0.0.1:5000/api/products/${id}`).then(res =>
    dispatch({
      type: UPDATE_PRODUCT,
      payload: id
    })
  );
};

export const setProductsLoading = () => {
  return {
    type: PRODUCTS_LOADING
  };
};

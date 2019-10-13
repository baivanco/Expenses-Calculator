import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCTS_LOADING
} from "../actions/types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getProducts = () => (dispatch, getState) => {
  dispatch(setProductsLoading());

  axios
    .get("http://127.0.0.1:5000/api/products/", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addProduct = product => (dispatch, getState) => {
  axios
    .post("http://127.0.0.1:5000/api/products/", product, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteProduct = id => (dispatch, getState) => {
  axios
    .delete(`http://127.0.0.1:5000/api/products/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_PRODUCT,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateProduct = id => (dispatch, getState) => {
  axios
    .put(`http://127.0.0.1:5000/api/products/${id}`, tokenConfig(getState))
    .then(res =>
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

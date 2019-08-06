import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCTS_LOADING
} from "../actions/types";

const initalState = {
  products: [],
  loading: false
};

export default function(state = initalState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };

    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products]
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product._id !== action.payload
        )
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products]
      };

    case PRODUCTS_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}

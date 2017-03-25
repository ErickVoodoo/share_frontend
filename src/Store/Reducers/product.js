// @flow
import { fromJS } from 'immutable';

import { Types } from '../../Constants/Actions/products.js';
const { SUCCESS_GET_PRODUCTS, FAIL_GET_PRODUCTS, CLEAR_PRODUCTS } = Types;

const initialState = fromJS({
  products: [],
  meta: {},

  error: {},
});

export default function products(store: Object = initialState, { type, payload }: { type: string, payload: any }) {
  console.log(type);
  switch (type) {
    case SUCCESS_GET_PRODUCTS:
      return store.merge({
        products: payload.products,
        meta: payload.meta,
        error: {},
      });

    case FAIL_GET_PRODUCTS:
      return store.merge({
        products: [],
        meta: [],
        error: payload,
      });

    case CLEAR_PRODUCTS:
      return store.merge({
        products: [],
        meta: [],
        error: {},
      });

    default:
      return store;
  }
}

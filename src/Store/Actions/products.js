// @flow

import { Types } from '../../Constants/Actions/products.js';

const { GET_PRODUCTS, SUCCESS_GET_PRODUCTS, FAIL_GET_PRODUCTS, CLEAR_PRODUCTS } = Types;

export const getProducts = ({ params, token }: { params: Object, token: string }): Object => ({
  type: GET_PRODUCTS,
  payload: {
    params,
    token,
  },
});

export const successGetProducts = ({ payload }: { payload: Object }): Object => ({
  type: SUCCESS_GET_PRODUCTS,
  payload,
});

export const failGetProducts = ({ error: payload }: { error: Object }): Object => ({
  type: FAIL_GET_PRODUCTS,
  payload,
});

export const clearProducts = (): Object => ({
  type: CLEAR_PRODUCTS,
});

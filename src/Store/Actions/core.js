// @flow

import { GET_INITIAL, GET_ATTRIBUTES, CLEAR_ATTRIBUTES, SUCCESS_GET_INITIAL, FAIL_GET_INITIAL, SUCCESS_GET_ATTRIBUTES, FAIL_GET_ATTRIBUTES } from '../../Constants/Actions/core.js';

export const getInitial = (): Object => ({
  type: GET_INITIAL,
});

export const getAttributes = ({ payload }: { payload: Object }): Object => ({
  type: GET_ATTRIBUTES,
  payload,
});

export const successGetInitial = ({ payload }: { payload: Object }): Object => ({
  type: SUCCESS_GET_INITIAL,
  payload,
});

export const failGetInitial = ({ error: payload }: { error: Object}): Object => ({
  type: FAIL_GET_INITIAL,
  payload,
});

export const successGetAttributes = ({ payload }: { payload: Object }): Object => ({
  type: SUCCESS_GET_ATTRIBUTES,
  payload,
});

export const failGetAttributes = ({ error: payload }: { error: Object}): Object => ({
  type: FAIL_GET_ATTRIBUTES,
  payload,
});

export const clearAttributes = ({ payload }: { payload: Array<string> }): Object => ({
  type: CLEAR_ATTRIBUTES,
  payload,
});

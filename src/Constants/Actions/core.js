// @flow

export const ABORT_REQUEST: string = 'core/ABORT_REQUEST';

export const GET_INITIAL: string = 'core/GET_INITIAL_DATA';
export const SUCCESS_GET_INITIAL: string = 'core/SUCCESS_GET_INITIAL';
export const FAIL_GET_INITIAL: string = 'core/FAIL_GET_INITIAL';

export const GET_ATTRIBUTES: string = 'core/GET_ATTRIBUTES';
export const SUCCESS_GET_ATTRIBUTES: string = 'core/SUCCESS_GET_ATTRIBUTES';
export const FAIL_GET_ATTRIBUTES: string = 'core/FAIL_GET_ATTRIBUTES';

export const CLEAR_ATTRIBUTES: string = 'core/CLEAR_ATTRIBUTES';

export const abortRequest = (): Object => ({
  type: ABORT_REQUEST,
});

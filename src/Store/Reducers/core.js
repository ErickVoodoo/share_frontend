// @flow
import { fromJS } from 'immutable';
import { isArray } from 'lodash';
import { SUCCESS_GET_INITIAL, FAIL_GET_INITIAL, SUCCESS_GET_ATTRIBUTES, FAIL_GET_ATTRIBUTES, CLEAR_ATTRIBUTES } from '../../Constants/Actions/core.js';

const initialState = fromJS({
  countries: [],
  categories: [],
  delivers: [],
  plans: [],
  cities: [],
  streets: [],

  error: {},
});

export default function core(store: Object = initialState, { type, payload }: { type: string, payload: any }) {
  switch (type) {
    case SUCCESS_GET_INITIAL:
      return store.merge({
        countries: payload.countries,
        categories: payload.categories,
        delivers: payload.delivers,
        plans: payload.plans,
        error: {},
      });

    case FAIL_GET_INITIAL:
      return store.merge({
        ...initialState.toJS(),
        error: payload,
      });

    case SUCCESS_GET_ATTRIBUTES:
      return store.merge({
        ...payload,
      });

    case FAIL_GET_ATTRIBUTES:
      return store.merge({
        error: payload,
      });

    case CLEAR_ATTRIBUTES:
      {
        const empty = {};

        if (isArray(payload)) {
          payload.forEach((item) => {
            empty[item] = [];
          });
        }
        console.log('ATTENTION', empty);
        return store.merge({
          ...empty,
        });
      }

    default:
      return store;
  }
}

// @flow
import { fromJS, List } from 'immutable';

import { Types } from '../../Constants/Actions/behaviors.js';
const { START_PROGRESSBAR, STOP_PROGRESSBAR } = Types;

const initialState = fromJS({
  progressbar: {
    global: [],
    local: [],
  },
});

export default function behaviors(store: Object = initialState, { type, payload }: { type: string, payload: any }) {
  switch (type) {
    case START_PROGRESSBAR: {
      if (payload) {
        const { type: payloadType, name: payloadName } = payload;
        if (payloadType && payloadName) {
          const values = store.getIn(['progressbar', payloadType]);
          return store.setIn(['progressbar', payloadType], fromJS([...values, payloadName]));
        }
      }

      return store;
    }

    case STOP_PROGRESSBAR: {
      if (payload) {
        const { type: payloadType, name: payloadName } = payload;
        if (payloadType && payloadName) {
          return store.setIn(['progressbar', payloadType],
            fromJS(store.getIn(['progressbar', payloadType]).filter((i) => i !== payloadName))
          );
        }
      }

      return store;
    }

    default:
      return store;
  }
}

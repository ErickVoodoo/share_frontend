// @flow

import { Types } from '../../Constants/Actions/behaviors.js';
const { START_PROGRESSBAR, STOP_PROGRESSBAR } = Types;

export const startProgressBar = ({ type, name }: { type?: string, name?: string } = {}): Object => ({
  type: START_PROGRESSBAR,
  payload: {
    type: type || '',
    name: name || '',
  },
});

export const stopProgressBar = ({ type, name }: { type?: string, name?: string } = {}): Object => ({
  type: STOP_PROGRESSBAR,
  payload: {
    type: type || '',
    name: name || '',
  },
});

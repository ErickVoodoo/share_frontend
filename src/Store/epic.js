import { combineEpics } from 'redux-observable';

import { fetchInitialEpic, fetchAddresses } from './Middlewares/core.js';
import { fetchProductsEpic } from './Middlewares/productsepic.js';

export const rootEpic = combineEpics(
  fetchInitialEpic,
  fetchAddresses,
  fetchProductsEpic,
);

// @flow

import { Observable } from 'rxjs/Rx';
import { Types } from '../../Constants/Actions/products.js';
import queryString from 'query-string';
import { successGetProducts, failGetProducts } from '../Actions/products.js';
import { startProgressBar, stopProgressBar } from '../Actions/behaviors.js';

import { ABORT_REQUEST } from '../../Constants/Actions/core.js';
import { PROGRESSBARS } from '../../Constants/progressbar.js';

import request from '../../Utils/request.js';

const { GET_PRODUCTS } = Types;

export const fetchProductsEpic = (action$: Object): Object =>
  action$.ofType(GET_PRODUCTS)
    .mergeMap(({ payload: { params, token, id = '' } }) =>
      Observable.create((observable) => {
        request({
          path: `http://localhost:8080/api/v1/products/${id}?${queryString.stringify(params)}`,
          method: 'GET',
        })
        .then(({ response: { products, meta } }) => {

          setTimeout(() => {
            observable.next(successGetProducts({ payload: { products, meta }}));
            observable.next(stopProgressBar(PROGRESSBARS.getProducts));
            observable.complete();
          }, 500);
        })
        .catch(({ error }) => {
          observable.next(failGetProducts({ error }));
          observable.next(stopProgressBar(PROGRESSBARS.getProducts));
          observable.complete();
        })
      })
      .startWith(startProgressBar(PROGRESSBARS.getProducts))
      .takeUntil(action$.ofType(ABORT_REQUEST))
    );
